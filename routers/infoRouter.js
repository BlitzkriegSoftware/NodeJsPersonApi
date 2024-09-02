'use strict';

/**
 * Endpoints common to all REST APIs
 * @public
 * @module routes/inforouter
 */

const Result = require('../models/result');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const express = require('express');
const router = express.Router();
router.use(express.json());

/**
 * GET /About
 * @alias module:routes/inforouter.about
 * @returns {String} JSON of Info
 */
const about = router.get('/about', (req, res) => {
  /*
    #swagger.summary = 'About this API'
    #swagger.responses[200] = {
      description: "OK"
    } 
    #swagger.responses[500] = {
      description: "Missing critical file"
    } 
  */
  const filename = path.join(global.appRoot, 'package.json');

  fs.promises
    .readFile(filename, 'utf8')
    .then(function (json) {
      const id = JSON.parse(json);
      const info = {
        author: id.author || '(missing)',
        version: id.version || '(missing)',
        description: id.description || 'People API',
        license: id.license || '(missing)',
        git: id.config.giturl || '(missing)',
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
  /* 
    #swagger.summary = 'Health check'
    #swagger.responses[200] = {
      description: "Healthy"
    } 
    #swagger.responses[500] = {
      description: "Missing package or swagger file"
    } 
  */
  let sc = 200;
  let message = 'Healthy';

  const packagePath = path.join(global.appRoot, 'package.json');
  const swaggerPath = path.join(global.appRoot, 'swagger.json');

  if (!fs.existsSync(packagePath)) {
    sc = 500;
    message = `Missing: ${packagePath}`;
  }

  if (!fs.existsSync(swaggerPath)) {
    sc = 500;
    message = `Missing: ${swaggerPath}`;
  }

  res.status(sc).json(message);
});

/**
 * GET /swagger
 * @alias module:routes/inforouter.swagger
 * @returns <String> Swagger.json in OpenAPI3
 */
const swagger = router.get('/openapi3', (req, res) => {
  /*
    #swagger.summary = 'OpenApi3 JSON Definition (swagger)'
    #swagger.responses[200] = {
      description: "OK"
    } 
    #swagger.responses[500] = {
      description: "Missing swagger file"
    } 
  */
  const swaggerPath = path.join(global.appRoot, 'swagger.json');
  if (fs.existsSync(swaggerPath)) {
    const swaggerFile = require(swaggerPath);
    res.status(200).json(swaggerFile);
  } else {
    const message = `Missing Swaggerfile: ${swaggerPath}`;
    res.status(500).json(message);
  }
});

/*
  ------------------
  (exports)
  ------------------
*/
module.exports = router;
