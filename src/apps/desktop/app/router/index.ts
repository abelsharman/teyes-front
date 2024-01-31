import { createRouter, createWebHashHistory } from 'vue-router';

import { MainPage } from '@pages/main/index.desktop';
import { ProductPage } from '@pages/product/index.desktop';
import { ProductsPage } from '@pages/products/index.desktop';

export const router = createRouter({
  history: createWebHashHistory('/'),
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/products',
      name: 'ProductsPage',
      component: ProductsPage
    },
    {
      path: '/:category_slug/:product_slug',
      name: 'ProductPage',
      component: ProductPage
    }
  ],
});
