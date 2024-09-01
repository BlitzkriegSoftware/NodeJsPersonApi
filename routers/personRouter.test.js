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
const personRouter = require('./personRouter');
app.use('/', personRouter);

let data = null;

describe('Person API', () => {
  test('/person/samples:count', async () => {
    const res = await request(app).post('/person/samples/5');
    expect(res.statusCode).toEqual(200);
    data = res.body;
    expect(data != null).toBe(true);
  });
  test('/person/list', async () => {
    const res = await request(app).get('/person/list');
    expect(res.statusCode).toEqual(200);
    const result = res.body;
    expect(result != null).toBe(true);
  });
  test('/person/search/:text', async () => {
    const url = `/person/search/${data[0].firstname}`;
    const res = await request(app).get(url);
    expect(res.statusCode).toEqual(200);
    const result = res.body;
    expect(result != null).toBe(true);
  });
  test('/person/:id', async () => {
    const url = `/person/${data[0].id}`;
    const res = await request(app).get(url);
    expect(res.statusCode).toEqual(200);
    const result = res.body;
    expect(result != null).toBe(true);
  });
  test('/person/ (post)', async () => {
    const payload = data[1];
    payload.firstname = 'Bob';
    const res = await request(app)
      .post('/person')
      .send(payload)
      .set('Accept', 'application/json');
    expect(res.statusCode).toEqual(200);
    const result = res.body;
    expect(result != null).toBe(true);
  });
  test('/person/:id (delete)', async () => {
    const id = data[3].id;
    const url = `/person/${id}`;
    const res = await request(app).delete(url);
    expect(res.statusCode).toEqual(200);
  });
});
