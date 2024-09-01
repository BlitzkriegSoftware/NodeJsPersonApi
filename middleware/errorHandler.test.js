'use strict';

// https://jestjs.io/docs/getting-started
const { describe, expect, test } = require('@jest/globals');
const path = require('path');
const fs = require('node:fs');
const Utility = require('../library/utility');

const request = require('supertest');
const { NextFunction, Request, Response } = require('express');

const handler = require('./errorHandler');

// Mock Error
const mockedError = () => {
  const err = new Error('Oh No');
  err.statusCode = 500;
  err.message = 'Server Error';
  return err;
};

// Request
const mockRequest = () => {
  const req = {};
  // ...from here assign what properties you need on a req to test with
  return req;
};

// Response
const mockResponse = () => {
  const res = {};
  res.statusCode = 500;
  res.message = 'Server Error';

  return {
    status: function (code) {
      res.statusCode = code;
      return this;
    },
    json: function (payload) {
      res.message = payload;
      return this;
    },
    res
  };
};

test('Error Handler', () => {
  const err = mockedError();
  const req = mockRequest();
  const res = mockResponse();
  const nxt = jest.fn();
  handler(err, req, res, nxt);
  expect(res.res.statusCode == 500).toBe(true);
  expect(Utility.isBlank(res.res.message)).toBe(false);
});
