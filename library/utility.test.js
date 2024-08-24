'use strict';

// https://jestjs.io/docs/getting-started
const { describe, expect, test } = require('@jest/globals');
const path = require('path');
const fs = require('node:fs');
const crypto = require('node:crypto');
const Utility = require('../library/utility');

test('ensureFolderExists', () => {
  const id = crypto.randomBytes(24).toString('hex');
  let folder = path.join(
    process.env.SystemDrive,
    'temp',
    'personapi-tests',
    id,
  );

  Utility.ensureFolderExists(folder);
  expect(fs.existsSync(folder)).toBe(true);

  folder = path.join(folder, 'testresults');
  Utility.ensureFolderExists(folder);
  expect(fs.existsSync(folder)).toBe(true);
});

test('makeStamp', () => {
  const d = new Date(2024, 1, 2, 3, 4, 5, 6, 7);
  const stamp = Utility.makeStamp(d);
  expect(stamp.length > 0).toBe(true);
});

test('logFilename', () => {
  const id = crypto.randomBytes(24).toString('hex');
  const folder = path.join(
    process.env.SystemDrive,
    'temp',
    'personapi-tests',
    id,
  );
  global.appRoot = folder;

  let logFile = Utility.logFilename(null, 1);
  expect(logFile.length > 0).toBe(true);

  var d = new Date(2024, 1, 2, 3, 4, 5, 6, 7);
  logFile = Utility.logFilename(d, 1);
  expect(logFile.length > 0).toBe(true);

  var d = new Date(2024, 11, 12, 13, 14, 15, 16, 17);
  logFile = Utility.logFilename(d, 1);
  expect(logFile.length > 0).toBe(true);
});

test('isBlank', () => {
  let data = null;
  expect(data == null).toBe(true);
  expect(Utility.isBlank(data)).toBe(true);

  data = 'abc';
  expect(data == null).toBe(false);
  expect(Utility.isBlank(data)).toBe(false);
});

test('propIsValid', () => {
  const f = 'foo';
  const v = 'boo';
  let o = null;
  expect(o == null).toBe(true);
  expect(Utility.propIsValid(o, f)).toBe(false);

  o = {};
  expect(Utility.propIsValid(o, f)).toBe(false);

  o[f] = v;
  expect(Utility.propIsValid(o, f)).toBe(true);

  o[f] = '';
  expect(Utility.propIsValid(o, f)).toBe(false);
});

test('isString', () => {
  expect(Utility.isString(null)).toBe(false);
  expect(Utility.isString('moo')).toBe(true);
});

test('toSafeString', () => {
  expect(Utility.toSafeString(null) == '').toBe(true);
  expect(Utility.toSafeString('moo') == 'moo').toBe(true);
  expect(Utility.toSafeString(99) == '99').toBe(true);
  expect(Utility.toSafeString('\u0006moo\u0007') == 'moo').toBe(true);
});
