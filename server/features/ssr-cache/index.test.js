import { vi, describe, it, expect } from 'vitest';
import { withCache, getSSRCacheKey } from './index.js';

const mockLogger = {
  debug: vi.fn(),
  info: vi.fn(),
};

describe('server/features/ssr-cache', () => {
  describe('getSSRCacheKey', () => {
    it.each([
      ['ru', '/', true, 'ru::m::/'],
      ['kk', '/anywhere', false, 'kk::d::/anywhere'],
    ])('%s %s isMobile=%s => %s', (path, isMobile, expected) => {
      const result = getSSRCacheKey(path, { isMobile });

      expect(result).toBe(expected);
    });
  });

  describe('withCache', () => {
    it('should return correct response', async () => {
      const httpResponse = {
        statusCode: 200,
        contentType: 'text/html',
        body: 'html',
      };

      const cachedRender = withCache(() => ({ httpResponse }), {
        cache: new Map(),
      });

      const result = await cachedRender(
        {
          path: '/',
          useragent: { isMobile: true },
        },
        { logger: mockLogger },
      );

      expect(result).toEqual(httpResponse);
    });

    it('should save to cache', async () => {
      const CACHE_KEY = 'ru::m::/';
      const BODY = 'html';

      const cache = new Map();
      const cachedRender = withCache(
        () => ({
          httpResponse: {
            statusCode: 200,
            contentType: 'text/html',
            body: BODY,
          },
        }),
        { cache },
      );

      await cachedRender(
        {
          path: '/',
          useragent: { isMobile: true },
        },
        {
          cacheKey: CACHE_KEY,
          logger: mockLogger,
        },
      );

      const cachedBody = cache.get(CACHE_KEY).body;

      expect(cachedBody).toEqual(BODY);
    });

    it('should return cached response', async () => {
      const CACHE_KEY = 'ru::m::/';

      const cachedResponse = {
        contentType: 'text/html',
        statusCode: 200,
        body: 'html',
      };

      const cache = new Map([[CACHE_KEY, cachedResponse]]);

      const render = vi.fn();
      const cachedRender = withCache(render, { cache });

      const response = await cachedRender(
        {
          path: '/',
          useragent: { isMobile: true },
        },
        {
          cacheKey: CACHE_KEY,
          logger: mockLogger,
        },
      );

      expect(render).not.toHaveBeenCalled();
      expect(response).toEqual(cachedResponse);
    });

    it.each([500])(
      'should not cache non 200 response. status = %i',
      async statusCode => {
        const cache = new Map();
        const cachedRender = withCache(
          () => ({
            httpResponse: {
              statusCode,
              contentType: 'text/html',
              body: 'error html',
            },
          }),
          { cache },
        );

        await cachedRender(
          {
            path: '/',
            useragent: { isMobile: true },
          },
          { logger: mockLogger },
        );

        expect(cache.size).toBe(0);
      },
    );

    it('should cache 404', async () => {
      const BODY = 'html';

      const cache = new Map();
      const cachedRender = withCache(
        () => ({
          httpResponse: {
            statusCode: 404,
            contentType: 'text/html',
            body: BODY,
          },
        }),
        { cache },
      );

      await cachedRender(
        {
          path: '/notfound',
          useragent: { isMobile: false },
        },
        { logger: mockLogger },
      );

      const cachedBody = cache.get('ru::404').body;

      expect(cachedBody).toEqual(BODY);
    });

    it('should return cached 404', async () => {
      const cachedResponse = {
        contentType: 'text/html',
        statusCode: 404,
        body: 'html',
      };

      const cache = new Map([['ru::404', cachedResponse]]);

      const cachedRender = withCache(
        () => ({
          httpResponse: null,
          is404: true,
        }),
        { cache },
      );

      const response = await cachedRender(
        {
          path: '/',
          useragent: { isMobile: true },
        },
        { logger: mockLogger },
      );

      expect(response).toEqual(cachedResponse);
    });
  });
});
