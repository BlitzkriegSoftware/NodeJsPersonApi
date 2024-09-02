'use strict';

// https://jestjs.io/docs/getting-started
const { describe, expect, test } = require('@jest/globals');
const path = require('path');
const fs = require('node:fs');
const Utility = require('../library/utility');

const request = require('supertest');
const { NextFunction, Request, Response } = require('express');

const handler = require('./errorHandler');
const exp = require('constants');

// Skip Error Handler
let skipped = false;

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
  return req;
};

// Response
const mockResponse = () => {
  const res = {};
  res.statusCode = 500;
  res.message = 'Server Error';
  res.headersSent = false;

  return {
    status: function (code) {
      res.statusCode = code;
      return this;
    },
    json: function (payload) {
      res.message = payload;
      return this;
    },
    getStatusCode: function () {
      return res.statusCode;
    },
    getMessage: function () {
      return res.message;
    },
    res
  };
};

function mockNext(err) {
  if (err != null) {
    skipped = true;
  } else {
    skipped = false;
  }
}

test('Error Handler - Skip', () => {
  skipped = false;
  const err = mockedError();
  const req = mockRequest();
  const res = mockResponse();
  res.headersSent = true;

  handler(err, req, res, mockNext);
  expect(skipped).toBe(true);
});

test('Error Handler - Default', () => {
  skipped = false;
  const err = mockedError();
  const req = mockRequest();
  const res = mockResponse();
  res.headersSent = false;
  const nxt = mockNext();

  handler(err, req, res, nxt);
  expect(skipped).toBe(false);
  expect(res.getMessage() != null).toBe(true);
  expect(res.getStatusCode() == 500).toBe(true);
});
