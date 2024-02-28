import { isUndefined } from 'lodash-es';
import { env } from '../config';

export interface AppContext {
  buildTarget: 'mobile' | 'desktop';
}

let appContext: AppContext;

export function createAppContext(pageContext: {
  isMobile: boolean;
}) {
  const { isMobile } = pageContext;

  appContext = {
    buildTarget: isMobile ? 'mobile' : 'desktop',
  };

  return appContext;
}

export const appContextSymbol = Symbol('app-context');

export function getAppContext() {
  if (env.IS_SSR) {
    throw new Error(
      '"getAppContext" should not be called in SSR environment to avoid cross request pollution.',
    );
  }

  if (isUndefined(appContext)) {
    throw new Error(
      '"app context" is not defined yet. Forgot to call createAppContext(pageContext)?',
    );
  }

  return appContext;
}
