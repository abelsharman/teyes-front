import path from 'path';
import fastify from 'fastify';

import { fileURLToPath } from 'url';
import { randomUUID } from 'node:crypto';

import fastifyCookie from '@fastify/cookie';
import { viteDevServer } from './plugins/vite-dev-server.js';
import { serveStatic } from './plugins/serve-static.js';
import { ssr } from './plugins/ssr.js';
import { useragent } from './plugins/useragent.js';
import { config } from './config/index.js';
import { sitemap } from './plugins/sitemap.js';
import { ping } from './plugins/ping.js';
import { exportedAxios as axios } from './plugins/axios.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const root = path.join(__dirname, '..');

const PORT = config.get('port');
const APP_HOST = config.get('app_host');
const SERVER_API_PREFIX = config.get('server_api_prefix');

async function setupServer() {
  const app = fastify({
    logger: true,
    disableRequestLogging: true,
    requestIdHeader: false,
    genReqId: () => randomUUID(),
  });

  app.register(axios);
  app.register(useragent);
  app.register(fastifyCookie);
  app.register(ping, { prefix: SERVER_API_PREFIX });
  app.register(sitemap, { prefix: SERVER_API_PREFIX });

  await app.register(viteDevServer, { root });
  await app.register(serveStatic, { root });

  app.register(ssr);

  await app.listen({
    port: PORT,
    host: APP_HOST,
  });

  /* eslint-disable no-console */
  console.log(
    `Server running at: 
➜  Local:   http://localhost:${PORT}
➜  Network: http://${APP_HOST}:${PORT}`,
  );
  console.log('app process uptime', process.uptime());
  /* eslint-enable no-console */
}

async function setupServerWrap() {
  try {
    await setupServer();
  } catch (cause) {
    const error = new Error('ERR_APP_START');
    error.cause = cause;
  }
}

export { setupServerWrap as setupServer };
