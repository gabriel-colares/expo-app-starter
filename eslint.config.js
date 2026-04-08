// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    settings: {
      'import/resolver': {
        typescript: {
          project: './jsconfig.json',
        },
        node: {
          extensions: ['.js', '.jsx', '.json'],
        },
      },
    },
    rules: {
      'import/namespace': 'off',
    },
  },
  {
    ignores: ['dist/*', 'node_modules/*', '.expo/*'],
  },
]);
