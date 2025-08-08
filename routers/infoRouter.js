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
const RateLimit = require('express-rate-limit'); // Import express-rate-limit
const router = express.Router();
const openapi3Limiter = RateLimit({
  // Define rate limiter for `/openapi3`
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // Limit each IP to 100 requests per windowMs
});
router.use(express.json());

/**
 * GET /About
 * @name About
 * @function
 * @returns {String} JSON of Info
 * @example
 * 200 - Info
 * 500 - Missing Critical File
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
 * @Name Health
 * @function
 * @returns {Number} {String} HTTP Status Code + Message
 * @example
 * 200 - OK
 * 500 - Missing Critical Files, see message
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

/***
 * GET /version
 * @name version
 * @function
 * @returns {Number} {String} HTTP Status Code + Message
 * @example
 * 200 - 2.0.0
 * 500 - Missing package.json
 */
const version = router.get('/version', (req, res) => {
  /* 
    #swagger.summary = 'Version'
    #swagger.responses[200] = {
      description: "Current Version"
    } 
    #swagger.responses[500] = {
      description: "Missing swagger file"
    } 
  */
  let sc = 200;
  let message = 'Healthy';
  const filename = path.join(global.appRoot, 'package.json');
  if (!fs.existsSync(filename)) {
    sc = 500;
    message = `Missing: ${filename}`;
  } else {
    const text = fs.readFileSync(filename, 'utf8');
    const id = JSON.parse(text);
    message = id.version || '(missing)';
  }

  res.status(sc).json(message);
});

/**
 * GET /swagger
 * @Name Swagger
 * @function
 * @returns {JSON} Swagger.json in OpenAPI3
 * @example
 * 200 - OpenApi3 JSON
 * 500 - Missing Swagger File
 */
const swagger = router.get('/swagger', openapi3Limiter, (req, res) => {
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
