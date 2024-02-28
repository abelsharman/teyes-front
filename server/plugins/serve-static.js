import path from 'path';
import { config, IS_DEV } from '../config/index.js';

const SERVER_STATIC_PREFIX = config.get('server_static_prefix');

async function serveStatic(app, { root }) {
  if (IS_DEV) {
    return;
  }

  const { default: fastifyStatic } = await import('@fastify/static');

  const staticPath = path.join(root, 'dist', 'client');

  app.register(fastifyStatic, {
    root: staticPath,
    prefix: SERVER_STATIC_PREFIX,
  });
}

export { serveStatic };
