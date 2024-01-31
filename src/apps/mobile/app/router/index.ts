import { createRouter, createWebHashHistory } from 'vue-router';

import { MainPage } from '@pages/main/index.mobile';
import { ProductPage } from '@pages/product/index.mobile';
import { ProductsPage } from '@pages/products/index.mobile';

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
