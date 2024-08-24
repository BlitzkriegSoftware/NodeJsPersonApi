/**
 * @ignore
 */

const globals = require('globals');
const jsdoc = require('eslint-plugin-jsdoc');

module.exports = [
  {
    languageOptions: {
      ecmaVersion: 6,
      globals: {
        ...globals.node,
        ...globals.jest,
        ...globals.jsdoc,
      },
    },
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
      'semi': 'warn',
      'prefer-const': 'error',
      'no-unused-vars': 'error',
      'no-undef': 'error',
      //* ES6
      'arrow-spacing': 'error',
      'no-confusing-arrow': 'error',
      'no-duplicate-imports': 'error',
      'no-var': 'error',
      'object-shorthand': 'off',
      'prefer-const': 'error',
      'prefer-template': 'warn',
      'jsdoc/require-description': 'error',
      'jsdoc/check-values': 'error',
    },
  },
];
