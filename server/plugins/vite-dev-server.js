import middie from '@fastify/middie';
import fp from 'fastify-plugin';
import { IS_DEV } from '../config/index.js';

const plugin = async (app, { root }) => {
  if (!IS_DEV) {
    return;
  }

  const vite = await import('vite');

  const serverConfig = {
    server: {
      middlewareMode: true,
    },
    root,
  };

  const devServer = await vite.createServer(serverConfig);

  /**
   * @description enable express like middleware (e.g vite)
   */
  await app.register(middie);

  app.use(devServer.middlewares);
};

const viteDevServer = fp(plugin, {
  name: 'fastify/vite-dev-server',
  fastify: '4.x',
});

export { viteDevServer };
