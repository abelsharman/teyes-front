import { createRouter, createWebHashHistory } from 'vue-router';

import { MainPage } from '@pages/main/index.mobile';

export const router = createRouter({
  history: createWebHashHistory('/'),
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
  ],
});
