import type { App } from 'vue';
import { appContextSymbol, createAppContext } from './app-context';

export const provideAppContext = {
  install(app: App, pageContext: any) {
    app.provide(appContextSymbol, createAppContext(pageContext));
  },
};
