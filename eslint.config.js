module.exports = [
  {
    ignores: [
      '**/*.config.js',
      'coverage/',
      'docs/',
      'node_modules/',
      'scripts/',
    ],
    rules: {
      'semi': 'off',
      'prefer-const': 'error',
    },
  },
];
