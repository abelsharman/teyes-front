/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
          ['@assets', './src/shared/assets'],
          ['@icons', './src/shared/assets/images/icons'],
          ['@shared', './src/shared'],
          ['@packages', './src/packages'],
          ['@features', './src/features'],
          ['@entities', './src/entities'],
          ['@widgets', './src/widgets'],
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.vue'],
      },
    },
  },
  rules: {
    'comma-dangle': 'off',
    'vue/no-v-model-argument': 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['mobile.page', 'desktop.page'],
      },
    ],
    'vue/v-on-event-hyphenation': ['error', 'never'],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
    ],
  },
  overrides: [
    {
      files: 'server/**/*.js',
      rules: {
        'import/extensions': [
          'error',
          'ignorePackages',
          {
            js: 'always',
          },
        ],
      },
    },
  ],
};
