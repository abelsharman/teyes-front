import { describe, it, expect, vi } from 'vitest';
import { withDedupe } from './index.js';

describe('server/features/dedupe', () => {
  const MOCK_LOGGER = { debug: vi.fn() };
  const MOCK_PAGE_CONTEXT = {};
  const ANY_RESPONSE = {};

  it('should not call render if there is already render in progress', async () => {
    const CACHE_KEY = 'key';

    const render = vi.fn();
    const dedupeMap = new Map([[CACHE_KEY, ANY_RESPONSE]]);

    const dedupe = withDedupe(render, { dedupeMap });

    const result = await dedupe(MOCK_PAGE_CONTEXT, {
      cacheKey: CACHE_KEY,
      logger: MOCK_LOGGER,
    });

    expect(result).toBe(ANY_RESPONSE);
    expect(render).not.toHaveBeenCalled();
  });

  it('should call render if there is no render in progress', async () => {
    const CACHE_KEY = 'key';

    const render = vi.fn(() => ANY_RESPONSE);
    const dedupeMap = new Map();

    const dedupe = withDedupe(render, { dedupeMap });

    const result = await dedupe(MOCK_PAGE_CONTEXT, {
      cacheKey: CACHE_KEY,
      logger: MOCK_LOGGER,
    });

    expect(result).toBe(ANY_RESPONSE);
    expect(render).toHaveBeenCalledWith(MOCK_PAGE_CONTEXT, {
      cacheKey: CACHE_KEY,
      logger: MOCK_LOGGER,
    });
  });
});
