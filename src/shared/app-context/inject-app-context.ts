import { inject } from 'vue';
import { appContextSymbol } from './app-context';
import type { AppContext } from './app-context';

/**
 * Method to inject the appContext, such as buildTarget (what is that for?)
 *
 * TODO: Think about other, more convenient and clear way to pass appContext,
 * so we don't need to import it every time
 */
export function injectAppContext() {
  const appContext = inject(appContextSymbol);

  if (!appContext) {
    throw new Error('App context controller was not provided');
  }

  return appContext as AppContext;
}
