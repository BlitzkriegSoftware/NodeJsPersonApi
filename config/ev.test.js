'use strict';

// https://jestjs.io/docs/getting-started
// https://www.npmjs.com/package/supertest
const { describe, expect, test } = require('@jest/globals');
const path = require('path');
const fs = require('node:fs');
const Utility = require('../library/utility');

const EnvironmentConfiguration = require('./ev.js');
const config = new EnvironmentConfiguration();

describe('Environment Config', () => {
  test('Port', () => {
    expect(Utility.isBlank(config.Port)).toBe(false);
  });
  test('Log_Rotate_Size', () => {
    expect(Utility.isBlank(config.Log_Rotate_Size)).toBe(false);
  });
  test('Log_Rotate_Interval', () => {
    expect(Utility.isBlank(config.Log_Rotate_Interval)).toBe(false);
  });
  test('Log_Rotate_MaxFiles', () => {
    expect(Utility.isBlank(config.Log_Rotate_MaxFiles)).toBe(false);
  });
  test('Log_Rotate_MaxFiles', () => {
    expect(Utility.isBlank(config.Log_Rotate_MaxFiles)).toBe(false);
  });
  test('Cors_Origins', () => {
    expect(Utility.isBlank(config.Cors_Origins)).toBe(false);
  });
  test('Cors_Methods', () => {
    expect(Utility.isBlank(config.Cors_Methods)).toBe(false);
  });
  test('Infosec_Csp', () => {
    expect(Utility.isBlank(config.Infosec_Csp)).toBe(false);
  });
  test('Infosec_Sts', () => {
    expect(Utility.isBlank(config.Infosec_Sts)).toBe(false);
  });
  test('Infosec_Xct', () => {
    expect(Utility.isBlank(config.Infosec_Xct)).toBe(false);
  });
  test('Infosec_Xfo', () => {
    expect(Utility.isBlank(config.Infosec_Xfo)).toBe(false);
  });
  test('Infosec_Rfp', () => {
    expect(Utility.isBlank(config.Infosec_Rfp)).toBe(false);
  });
  test('Infosec_Noh', () => {
    expect(Utility.isBlank(config.Infosec_Noh)).toBe(false);
  });
  test('Size_Limit', () => {
    expect(Utility.isBlank(config.Size_Limit)).toBe(false);
  });
  test('Urls', () => {
    expect(Array.isArray(config.Urls)).toBe(true);
    expect(config.Urls.length > 0).toBe(true);
  });
});
