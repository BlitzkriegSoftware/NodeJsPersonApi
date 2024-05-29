'use strict';

// https://jestjs.io/docs/getting-started
const { describe, expect, test } = require('@jest/globals');
const path = require('path');
const fs = require('node:fs');
var Utility = require('../library/utility').Utility;

test('ensureFolderExists', () => {
  var folder = __dirname;
  Utility.ensureFolderExists(folder);
  expect(fs.existsSync(folder)).toBe(true);

  folder = path.join(folder, 'testresults');
  Utility.ensureFolderExists(folder);
  expect(fs.existsSync(folder)).toBe(true);
});

test('makeStamp', () => {
  var stamp = Utility.makeStamp(new Date());
  expect(stamp.length > 0).toBe(true);
});

test('logFilename', () => {
  var folder = path.join(process.env.SystemDrive, 'temp');
  global.appRoot = folder;

  var logFile = Utility.logFilename(null, 1);
  expect(logFile.length > 0).toBe(true);

  logFile = Utility.logFilename(new Date(), 1);
  expect(logFile.length > 0).toBe(true);
});

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
