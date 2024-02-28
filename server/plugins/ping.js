/**
 * @type {import('fastify').FastifyPluginCallback}
 */
export const ping = (app, _, done) => {
  app.get('/ping', () => 'pong');
  done();
};
