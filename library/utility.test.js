'use strict';

// https://jestjs.io/docs/getting-started
const { describe, expect, test } = require('@jest/globals');

var Utility = require('../library/utility').Utility;

test('isBlank', () => {
  var data = null;
  expect(data == null).toBe(true);
  expect(Utility.isBlank(data)).toBe(true);

  data = 'abc';
  expect(data == null).toBe(false);
  expect(Utility.isBlank(data)).toBe(false);
});

test('propIsValid', () => {
  var f = 'foo';
  var v = 'boo';
  var o = null;
  expect(o == null).toBe(true);
  expect(Utility.propIsValid(o, f)).toBe(false);

  o = {};
  expect(Utility.propIsValid(o, f)).toBe(false);

  o[f] = v;
  expect(Utility.propIsValid(o, f)).toBe(true);

  o[f] = '';
  expect(Utility.propIsValid(o, f)).toBe(false);
});
