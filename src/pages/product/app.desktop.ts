import { createApp as createVueApp } from 'vue';
import { createPinia } from 'pinia';
import VueScrollTo from 'vue-scrollto'

import '@shared/css/tailwind.css';
import '@shared/css/transitions.css';
import '@shared/css/desktop.css';
import 'izitoast/dist/css/iziToast.min.css';

import { provideAppContext } from '@shared/app-context';

export function createApp(pageContext: any) {
  const { Page, pageProps } = pageContext;

  const pinia = createPinia();
  const app = createVueApp(Page, pageProps);

  app.use(VueScrollTo).use(pinia).use(provideAppContext, pageContext);

  function isReady() {
    return app;
  }

  function mount() {
    app.mount('#app');
  }

  return { app, mount, isReady };
}
