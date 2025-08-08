'use strict';

// https://jestjs.io/docs/getting-started
// https://www.npmjs.com/package/supertest
const { describe, expect, test } = require('@jest/globals');
const path = require('path');
const fs = require('node:fs');
const Utility = require('../library/utility');
const request = require('supertest');
const express = require('express');
const app = express();
const infoRouter = require('./infoRouter');
const TESTTIMEOUT = 0;

app.use('/', infoRouter);

beforeAll(() => {
  global.appRoot = process.cwd();
});

describe('Info Router', () => {
  test(
    'version',
    async () => {
      const res = await request(app).get('/version');
      expect(res.statusCode).toEqual(200);
    },
    TESTTIMEOUT
  );
  test(
    'health',
    async () => {
      const res = await request(app).get('/health');
      expect(res.statusCode).toEqual(200);
    },
    TESTTIMEOUT
  );
  test(
    'swagger',
    async () => {
      const res = await request(app).get('/swagger');
      expect(res.statusCode).toEqual(200);
    },
    TESTTIMEOUT
  );
});
