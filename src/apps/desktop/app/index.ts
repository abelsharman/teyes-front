import { createApp } from 'vue';
import VueScrollTo from 'vue-scrollto'

import { router } from '@desktop/app/router';
import { provideModal } from '@/shared/modal/index';

import '@shared/assets/css/tailwind.css';
import '@shared/assets/css/transitions.css';


import AppPage from './App.vue';

const app = createApp(AppPage);

app
  .use(provideModal)
  .use(VueScrollTo)
  .use(router)
  .mount('#app');
