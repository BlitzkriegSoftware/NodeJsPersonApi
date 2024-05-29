'use strict';

/**
 * Endpoints common to all REST APIs
 * @public
 * @module InfoRouter
 */

const fs = require('fs');
const fsPromises = require('fs').promises;
const express = require('express');
const router = express.Router();

router.use(express.json());

/**
 * GET /About
 * @method
 * @name info.about
 * @returns {String} JSON of Info
 */
router.get('/about', (req, res) => {
  // #swagger.summary = 'About this API'

  const filename = './package.json';

  fs.promises
    .readFile(filename, 'utf8')
    .then(function (json) {
      var id = JSON.parse(json);
      var info = {
        author: id.author || 'Stuart Williams',
        version: id.version || 'n/a',
        description: id.description || 'People API',
        license: id.license || 'MIT',
        git: 'https://github.com/BlitzkriegSoftware/NodeJsPersonApi',
        copyright: '(c) 2024-' + new Date().getFullYear().toString(),
      };

      res.status(200).json(info);
    })
    .catch(function (error) {
      var result = new Result('Error', error);
      res.status(500).json(result);
    });
});

/**
 * GET /health
 * @method
 * @name info.health
 * @returns {Number} {String} HTTP Status Code + Message
 */
router.get('/health', (req, res) => {
  // #swagger.summary = 'Health check'
  res.status(200).json('Healthy');
});

/**
 * GET /swagger
 * @method
 * @name info.swagger
 * @returns <String> Swagger.json in OpenAPI3
 */
router.get('/swagger', (req, res) => {
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
