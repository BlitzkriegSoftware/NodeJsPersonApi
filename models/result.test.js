'use strict';

// https://jestjs.io/docs/getting-started
const { describe, expect, test } = require('@jest/globals');
const Utility = require('../library/utility');

const Result = require('./result');

/**
 * TEST: Make Person generates valid People
 */
test('makeResult', () => {
  const model = new Result('Error', 'Bad');
  expect(model != null).toBe(true);

  const text = model.toString();
  expect(Utility.isBlank(test)).toBe(false);
});
