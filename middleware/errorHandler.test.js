'use strict';

// https://jestjs.io/docs/getting-started
const { describe, expect, test } = require('@jest/globals');
const path = require('path');
const fs = require('node:fs');
const Utility = require('../library/utility');

const request = require('supertest');
const { NextFunction, Request, Response } = require('express');

const handler = require('./errorHandler');

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
  res.status = jest.fn((code) => {});
  res.json = jest.fn((payload) => {});
  return res;
};

const mockedError = () => {
  const err = new Error('Oh No');
  err.statusCode = 500;
  err.message = 'Server Error';
  return err;
};

test('Error Handler', () => {
  const err = mockedError();
  const req = mockRequest();
  const res = mockResponse();
  const nxt = jest.fn();
  const result = handler(err, req, res, nxt);
});
