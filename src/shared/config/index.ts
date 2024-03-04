const RUNTIME_MODE = import.meta.env.VITE_APP_RUNTIME_MODE;

export const env = {
  RUNTIME_MODE,
  IS_STAGING_RUNTIME: RUNTIME_MODE === 'staging',
  IS_DEV_RUNTIME: RUNTIME_MODE === 'development',
  IS_PROD_RUNTIME: RUNTIME_MODE === 'production',
  BASE_URL: import.meta.env.VITE_APP_BASE_URL,
};

export const WIDE = 'wide';
export const TEYES = 'teyes';
export const RED_POWER = 'red-power';