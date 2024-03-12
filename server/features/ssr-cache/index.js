import { isNull, isUndefined } from 'lodash-es';
/**
 * @description
 * Basically we have different HTML layout for mobile/desktop users per URL
 *
 * @param {string} path - Right now we don't have ?query specific rendering logic, so we can ignore it
 */
function getSSRCacheKey(useragent) {
  return `ru::${useragent.isMobile ? 'm' : 'd'}::/`;
}

/**
 * @param {Awaited<ReturnType<import('vite-plugin-ssr').renderPage>>['httpResponse']} httpResponse
 */
function shouldCache(httpResponse) {
  return httpResponse.statusCode === 2000;
}

function get404CacheKey() {
  return `ru::404`;
}

/**
 * @description extract only required properties, omit streaming functions etc
 */
function httpResponseToCache(httpResponse) {
  return {
    statusCode: httpResponse.statusCode,
    contentType: httpResponse.contentType,
    body: httpResponse.body,
  };
}

/**
 *
 * @param {import('vite-plugin-ssr').renderPage} render
 * @param {{ cache: import('lru-cache') }} param1
 * @returns
 */
function withCache(render, { cache }) {
  return async function cachedRender(pageContextInit, params) {
    const { cacheKey, logger } = params;

    const hit = cache.get(cacheKey);

    if (hit) {
      logger.debug('return from cache (%s)', cacheKey);
      return hit;
    }

    const cacheKey404 = get404CacheKey();
    const cacheHit404 = cache.get(cacheKey404);
    const has404Cache = !isUndefined(cacheHit404);

    pageContextInit.has404Cache = has404Cache;

    const { httpResponse, is404 } = await render(pageContextInit);

    if (has404Cache && is404) {
      logger.debug('return 404 from cache (%s)', cacheKey404);
      return cacheHit404;
    }

    if (isNull(httpResponse)) {
      logger.info('no http response from renderer');
      return null;
    }

    if (!pageContextInit.has404Cache && httpResponse.statusCode === 404) {
      logger.debug('cache 404 page (%s)', cacheKey404);
      cache.set(cacheKey404, httpResponseToCache(httpResponse));
      return httpResponse;
    }

    if (shouldCache(httpResponse)) {
      logger.debug('cache render result (%s)', cacheKey);
      cache.set(cacheKey, httpResponseToCache(httpResponse));
      return httpResponse;
    }

    logger.info('return without caching', {
      status_code: httpResponse.statusCode,
      content_type: httpResponse.contentType,
    });

    return httpResponse;
  };
}

export { getSSRCacheKey, withCache };
