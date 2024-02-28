import fp from 'fastify-plugin';
import { createAxiosInstance } from '../../src/plugins/axios.js';

const plugin = async app => {
  console.log('wait for axios instance to be ready');

  const axios = await createAxiosInstance();
  app.decorateRequest('axios', null);
  app.addHook('onRequest', (req, _, done) => {
    req.axios = axios;
    done();
  });
};

export const exportedAxios = fp(plugin, {
  name: 'fastify/axios',
  fastify: '4.x',
});
