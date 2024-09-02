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
const Person = require('../models/person');
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
    const text = data[0].firstname;
    const url = `/person/search/${text}`;
    const res = await request(app).get(url);
    expect(res.statusCode).toEqual(200);
    const result = res.body;
    expect(result != null).toBe(true);
  });
  test('/person/search/:text (empty)', async () => {
    const text = '';
    const url = `/person/search/${text}`;
    const res = await request(app).get(url);
    expect(res.statusCode).toEqual(404);
  }, 50000);
  test('/person/search/:text (not found)', async () => {
    const url = `/person/search/xxxxxxxxxx`;
    const res = await request(app).get(url);
    expect(res.statusCode).toEqual(404);
  });
  test('/person/:id', async () => {
    const url = `/person/${data[0].id}`;
    const res = await request(app).get(url);
    expect(res.statusCode).toEqual(200);
    const result = res.body;
    expect(result != null).toBe(true);
  });
  test('/person/ (post update)', async () => {
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
  test('/person/ (post insert)', async () => {
    const payload = Person.makePerson();
    const res = await request(app)
      .post('/person')
      .send(payload)
      .set('Accept', 'application/json');
    expect(res.statusCode).toEqual(201);
    const result = res.body;
    expect(result != null).toBe(true);
  });
  test('/person/ (post bad)', async () => {
    const payload = '';
    const res = await request(app)
      .post('/person')
      .send(payload)
      .set('Accept', 'application/json');
    expect(res.statusCode).toEqual(400);
  });
  test('/person/:id (delete)', async () => {
    const id = data[3].id;
    const url = `/person/${id}`;
    const res = await request(app).delete(url);
    expect(res.statusCode).toEqual(200);
  });
  test('/person/:id (delete bad)', async () => {
    const id = 999999;
    const url = `/person/${id}`;
    const res = await request(app).delete(url);
    expect(res.statusCode).toEqual(404);
  });
});
