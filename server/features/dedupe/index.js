function withDedupe(render, { dedupeMap }) {
  return async function dedupe(pageContextInit, { cacheKey, logger }) {
    const hasRenderPromise = dedupeMap.has(cacheKey);

    if (hasRenderPromise) {
      logger.debug('dedupe rendering %s', cacheKey);
      const httpResponse = await dedupeMap.get(cacheKey);
      dedupeMap.delete(cacheKey);
      return httpResponse;
    }

    const renderPromise = render(pageContextInit, { cacheKey, logger });
    dedupeMap.set(cacheKey, renderPromise);
    await renderPromise;
    dedupeMap.delete(cacheKey);
    return renderPromise;
  };
}

export { withDedupe };
