import { createRouter, createWebHashHistory } from 'vue-router';

import { MainPage } from '@pages/main/index.desktop';
import { ProductPage } from '@pages/product/index.desktop';

export const router = createRouter({
  history: createWebHashHistory('/'),
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/:category_slug/:product_slug',
      name: 'ProductPage',
      component: ProductPage
    }
  ],
});
