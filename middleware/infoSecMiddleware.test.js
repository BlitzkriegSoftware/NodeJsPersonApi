'use strict';

// https://jestjs.io/docs/getting-started
const { describe, expect, test } = require('@jest/globals');
const path = require('path');
const fs = require('node:fs');
const Utility = require('../library/utility');

// Mocking for a module import
jest.mock('request');

// Request
const mockReq = () => {
  const req = {};
  // ...from here assign what properties you need on a req to test with
  return req;
};

// Response
const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};
