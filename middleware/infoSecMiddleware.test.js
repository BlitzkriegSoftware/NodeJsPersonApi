'use strict';

// https://jestjs.io/docs/getting-started
const { describe, expect, test } = require('@jest/globals');
const path = require('path');
const fs = require('node:fs');
const Utility = require('../library/utility');

const request = require('supertest');
const { NextFunction, Request, Response } = require('express');
const handler = require('./infoSecMiddleware');

const EnvironmentConfiguration = require('../config/ev.js');
const config = new EnvironmentConfiguration();

const infoSecOptions = {
  csp: config.Infosec_Csp,
  sts: config.Infosec_Sts,
  xct: config.Infosec_Xct,
  xfo: config.Infosec_Xfo,
  rfp: config.Infosec_Rfp,
  noh: config.Infosec_Noh
};

// Request
const mockRequest = () => {
  const req = {};
  // ...from here assign what properties you need on a req to test with
  return req;
};

// Response
function mockResponse() {
  const res = {};
  res.statusCode = 500;
  res.message = 'Server Error';
  res.headers = new Map();
  return {
    status: function (code) {
      res.statusCode = code;
      return this;
    },
    json: function (payload) {
      res.message = payload;
      return this;
    },
    setHeader: function (header, value) {
      res.headers.set(header, value);
      return this;
    },
    removeHeader: function (header) {
      res.headers.delete(header);
      return this;
    },
    headers: function () {
      return res.headers;
    },
    res
  };
}
const nxt = jest.fn();

test('InfoSec Handler', () => {
  const hf = handler(infoSecOptions);
  const res = mockResponse();
  const keys = ['x-powered-by', 'Server'];
  res.setHeader(keys[0], '1');
  res.setHeader(keys[1], '2');
  hf(mockRequest, res, nxt);
  const headers = res.headers();
  expect(headers.size == 6).toBe(true);
  keys.forEach((value) => {
    expect(headers.has(value)).toBe(false);
  });
});
