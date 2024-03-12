import { renderPage } from 'vite-plugin-ssr/server';
import { isNull } from 'lodash-es';
import { LRUCache } from 'lru-cache';
import { withCache, getSSRCacheKey } from '../features/ssr-cache/index.js';
import { withDedupe } from '../features/dedupe/index.js';
import { config } from '../config/index.js';

/**
 * This caching options are almost random
 * So they can be adjusted in future
 */
const ssrCache = new LRUCache({
  ttl: config.get('ssr.cache_ttl_ms'), //21600000
  max: 100,
});

const ssrPrefetchCache = new LRUCache({
  ttl: config.get('ssr.prefetch_cache_ttl_ms'),
  max: 100,
});

async function render(pageContextInit) {
  const pageContext = await renderPage(pageContextInit);

  if (pageContext.errorWhileRendering) {
    /**
     * @example
     * 1) Error thrown during "createApp" call
     * 2) Reference to "window" in client side code during SSR
     */
    const error = new Error('Error while rendering');
    error.cause = pageContext.errorWhileRendering;
  }

  return pageContext;
}

const cachedRender = withCache(render, { cache: ssrCache });
const dedupedRender = withDedupe(cachedRender, { dedupeMap: new Map() });

async function prefetch(cacheKey, request) {
  if (ssrPrefetchCache.has(cacheKey)) {
    return ssrPrefetchCache.get(cacheKey);
  }

  const response = await request();

  ssrPrefetchCache.set(cacheKey, response);

  return response;
}

async function ssrHandler(req, reply) {
  try {
    const { log, url, useragent } = req;

    const pageContextInit = {
      ssrPrefetchCache,
      prefetch,
      useragent,
      requestId: req.id,
      path: url,
      urlOriginal: req.originalUrl,
      axios: req.axios,
    };

    const cacheKey = getSSRCacheKey(useragent);
    const response = await dedupedRender(pageContextInit, {
      cacheKey,
      logger: log,
    });

    if (isNull(response)) {
      log.info({ url: req.originalUrl }, 'no_ssr_response');
      return reply.status(404);
    }

    reply.status(response.statusCode);
    reply.type(response.contentType);
    reply.send(response.body);
  } catch (cause) {
    const error = new Error('SSR Middleware Error');
    error.cause = cause;

    reply.send(error);
  }
}

function getDebugInfo() {
  return {
    ssr_cache_keys: Array.from(ssrCache.keys()),
    ssr_prefetch_cache_keys: Array.from(ssrPrefetchCache.keys()),
  };
}

const plugin = async app => {
  const debugEnvironments = ['development', 'staging'];
  const isDebugEnv = debugEnvironments.includes(config.get('env'));

  const checkToken = token => token === config.get('debug_token');

  app.post('/debug', req => {
    if (checkToken(req.body.token) || isDebugEnv) {
      return getDebugInfo();
    }

    return 'invalid token';
  });

  app.post('/debug/reset-cache', req => {
    if (checkToken(req.body.token) || isDebugEnv) {
      ssrPrefetchCache.clear();
      ssrCache.clear();
      return 'done';
    }

    return 'invalid token';
  });

  app.route({
    url: '*',
    method: 'GET',
    handler: ssrHandler,
  });
};

export { plugin as ssr };
