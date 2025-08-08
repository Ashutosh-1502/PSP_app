// eslint.config.js
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const pluginImport = require('eslint-plugin-import');
const path = require('path');

module.exports = defineConfig([
  expoConfig,
  {
    plugins: {
      import: pluginImport,
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: path.resolve(__dirname, './tsconfig.json'),
        },
      },
    },
    rules: {
      'import/no-unresolved': 'error', // or 'warn' or 'off' based on preference
      'import/order': 'warn', // optional: for organizing imports nicely
    },
    ignores: ['dist/*'],
  },
]);
