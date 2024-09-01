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
app.use('/', infoRouter);

describe('Info Router', () => {
  test('version', async () => {
    const res = await request(app).get('/about');
    expect(res.statusCode).toEqual(200);
  });
  test('health', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
  });
  test('openapi3', async () => {
    const res = await request(app).get('/openapi3');
    expect(res.statusCode).toEqual(200);
  });
});
