const schema = {
  env: {
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  port: {
    format: 'port',
    default: '8000',
    env: 'PORT',
  },
  app_host: {
    format: 'String',
    default: '0.0.0.0',
    env: 'APP_HOST',
  },
  deploy_env: {
    format: ['production', 'staging', 'development'],
    default: 'development',
    env: 'DEPLOY_ENV',
  },
  debug_token: {
    doc: 'Token for reset ssr cache',
    format: 'String',
    default: '123',
    env: 'DEBUG_TOKEN',
  },
  // statsd: {
  //   host: {
  //     doc: 'StatsD Host to send metrics',
  //     format: 'String',
  //     env: 'STATSD_HOST',
  //     default: 'localhost',
  //   },
  //   port: {
  //     doc: 'StatsD Port',
  //     format: 'port',
  //     env: 'STATSD_PORT',
  //     default: 8125,
  //   },
  //   prefix: {
  //     doc: 'Metrics prefix. Usually platform.{service}',
  //     format: 'String',
  //     env: 'STATSD_PREFIX',
  //   },
  // },
  ssr: {
    cache_ttl_ms: {
      doc: 'Time to store cached SSR HTML',
      format: 'Number',
      env: 'SSR_CACHE_TTL_MS',
      default: 1000,
    },
    prefetch_cache_ttl_ms: {
      doc: 'Time to store cached prefetch data for SSR',
      format: 'Number',
      env: 'SSR_PREFETCH_CACHE_TTL_MS',
      default: 1800000,
    },
  },
  base_site_url: {
    doc: 'Base url of site',
    format: 'String',
    env: 'BASE_SITE_URL',
    default: '/',
  },
  server_api_prefix: {
    doc: 'Prefix for api routes',
    format: 'String',
    env: 'SERVER_API_PREFIX',
    default: '/',
  },
  server_static_prefix: {
    doc: 'Prefix for static files',
    format: 'String',
    env: 'SERVER_STATIC_PREFIX',
    default: '/static',
  },
};

export { schema };
