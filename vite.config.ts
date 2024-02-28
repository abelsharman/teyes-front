import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
// import { sentryVitePlugin } from '@sentry/vite-plugin';
import ssr from 'vite-plugin-ssr/plugin';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''));

  const baseServerUrl = '/';

  const baseAssetsUrl = 'https://garagepro.kz/static/'
    // process.env.VITE_APP_RUNTIME_MODE === 'development'
    //   ? '/'
    //   : 'https://garagepro.kz/static/';

  return {
    envDir: __dirname,
    plugins: [
      vue({
        script: {
          defineModel: true,
        },
      }),
      ssr({
        /**
         * vite-plugin-ssr always uses "mode: production"
         * for "vite build" command which causes
         * - "production" ssr build
         * - "staging" client build
         */
        disableAutoFullBuild: true,
        baseAssets: baseAssetsUrl,
        baseServer: baseServerUrl,
        trailingSlash: false,
        disableUrlNormalization: true,
        noExternal: ['izitoast'],
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@assets': fileURLToPath(
          new URL('./src/shared/assets', import.meta.url),
        ),
        // '@icons': fileURLToPath(
        //   new URL('./src/shared/assets/images/icons', import.meta.url),
        // ),
        '@shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
        // '@packages': fileURLToPath(new URL('./src/packages', import.meta.url)),
        '@features': fileURLToPath(new URL('./src/features', import.meta.url)),
        '@entities': fileURLToPath(new URL('./src/entities', import.meta.url)),
        // '@widgets': fileURLToPath(new URL('./src/widgets', import.meta.url)),
      },
    },
  };
});
