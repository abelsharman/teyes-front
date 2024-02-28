import ua from 'express-useragent';
import fp from 'fastify-plugin';

const plugin = (app, _, done) => {
  app.decorateRequest('useragent', null);
  app.addHook('onRequest', (req, _, done) => {
    req.useragent = ua.parse(req.headers['user-agent']);
    done();
  });
  done();
};

export const useragent = fp(plugin, {
  name: 'fastify-useragent',
  fastify: '4.x',
});
