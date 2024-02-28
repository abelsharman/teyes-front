const defineDesktopRoute = (routeFunction: any) => (pageContext: any) => {
  if (pageContext.useragent.isMobile) {
    return false;
  }

  return routeFunction(pageContext);
};

const defineMobileRoute = (routeFunction: any) => (pageContext: any) => {
  if (!pageContext.useragent.isMobile) {
    return false;
  }

  return routeFunction(pageContext);
};

export const SsrRoutingLib = {
  defineDesktopRoute,
  defineMobileRoute,
};
