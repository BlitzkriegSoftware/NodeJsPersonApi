'use strict';

/**
 * Endpoints common to all REST APIs
 * @public
 * @module routes/inforouter
 */

const Result = require('../models/result');
const fs = require('fs');
const fsPromises = require('fs').promises;
const express = require('express');
const router = express.Router();
router.use(express.json());

/**
 * GET /About
 * @alias module:routes/inforouter.about
 * @returns {String} JSON of Info
 */
const about = router.get('/about', (req, res) => {
  // #swagger.summary = 'About this API'

  const filename = './package.json';

  fs.promises
    .readFile(filename, 'utf8')
    .then(function (json) {
      const id = JSON.parse(json);
      const info = {
        author: id.author || 'Stuart Williams',
        version: id.version || 'n/a',
        description: id.description || 'People API',
        license: id.license || 'MIT',
        git: 'https://github.com/BlitzkriegSoftware/NodeJsPersonApi',
        copyright: `(c) 2024-${new Date().getFullYear().toString()}`
      };

      res.status(200).json(info);
    })
    .catch(function (error) {
      const response = new Result('Error', error);
      res.status(500).json(response);
    });
});

/**
 * GET /health
 * @alias module:routes/inforouter.health
 * @returns {Number} {String} HTTP Status Code + Message
 */
const health = router.get('/health', (req, res) => {
  // #swagger.summary = 'Health check'
  res.status(200).json('Healthy');
});

/**
 * GET /swagger
 * @alias module:routes/inforouter.swagger
 * @returns <String> Swagger.json in OpenAPI3
 */
const swagger = router.get('/openapi3', (req, res) => {
  // #swagger.summary = 'OpenApi3 JSON Definition (swagger)'
  const swaggerFile = require('../swagger.json');
  res.status(200).json(swaggerFile);
});

/*
  ------------------
  (exports)
  ------------------
*/
module.exports = router;
