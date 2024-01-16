import { createApp } from 'vue';
import VueScrollTo from 'vue-scrollto'

import { router } from '@desktop/app/router';

import '@shared/assets/css/tailwind.css';
import '@shared/assets/css/transitions.css';


import AppPage from './App.vue';

const app = createApp(AppPage);

app
  .use(VueScrollTo)
  .use(router)
  .mount('#app');
