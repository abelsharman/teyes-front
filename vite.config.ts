import { join } from 'path';
import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

const DESKTOP_APP = 'desktop';
const MOBILE_APP = 'mobile';

const APP_NAME = process.env.VITE_APP_NAME;

const getRootDir = () => {
  switch (APP_NAME) {
    case DESKTOP_APP:
      return join(__dirname, 'src/apps/desktop');
    case MOBILE_APP:
      return join(__dirname, 'src/apps/mobile');
  }
};

const getPublicDir = () => {
  switch (APP_NAME) {
    case DESKTOP_APP:
      return join(__dirname, 'public/desktop');
    case MOBILE_APP:
      return join(__dirname, 'public/mobile');
  }
};

const getOutputDir = () => {
  switch (APP_NAME) {
    case DESKTOP_APP:
      return join(__dirname, 'server/static/desktop');
    case MOBILE_APP:
      return join(__dirname, 'server/static/mobile');
  }
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''));

  return {
    root: getRootDir(),
    envDir: __dirname,
    publicDir: getPublicDir(),
    build: {
      outDir: getOutputDir(),
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name].js`,
          chunkFileNames: `assets/[name].js`,
          assetFileNames: `assets/[name].[ext]`
        }
      }
    },
    base: `http://89.46.33.69/${APP_NAME}/`,
    plugins: [
      vue({
        script: {
          defineModel: true,
        },
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@mobile': fileURLToPath(new URL('./src/apps/mobile', import.meta.url)),
        '@desktop': fileURLToPath(new URL('./src/apps/desktop', import.meta.url)),
        '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
        '@assets': fileURLToPath(
          new URL('./src/shared/assets', import.meta.url),
        ),
        '@icons': fileURLToPath(
          new URL('./src/shared/assets/images/icons', import.meta.url),
        ),
        '@shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
        '@packages': fileURLToPath(new URL('./src/packages', import.meta.url)),
        '@features': fileURLToPath(new URL('./src/features', import.meta.url)),
        '@entities': fileURLToPath(new URL('./src/entities', import.meta.url)),
        '@widgets': fileURLToPath(new URL('./src/widgets', import.meta.url)),
      },
    },
  };
});
