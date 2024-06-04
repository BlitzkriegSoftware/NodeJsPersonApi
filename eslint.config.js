/**
 * @ignore
 */

const jsdoc = require('eslint-plugin-jsdoc');

module.exports = [
  {
    ignores: [
      '*.config.js',
      'coverage/**',
      'docs/**',
      'logs/**',
      'node_modules/**',
      'scripts/**',
    ],
  },
  {
    plugins: {
      jsdoc: jsdoc,
    },
    rules: {
      'semi': 'off',
      'prefer-const': 'error',
    },
  },
];
