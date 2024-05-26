'use strict';

/**
 * index.js - Entry Point
 */

/**
 * settings from environment variables
 */
const { Port } = require('./Settings/envVars.js');

/**
 * requires
 */
const swaggerUi = require('swagger-ui-express');

/**
 * Express setup
 */
const express = require('express');
const app = express();

/**
 * Security Middleware
 * https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html
 */

/**
 * CORS
 * https://dev.to/speaklouder/how-to-configure-cors-in-nodejs-with-express-11h
 */
const cors = require('cors');
let corsOptions = {
  origin: '*',
  methods: '*',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

app.use(function (req, res, next) {
  /**
   * CSP - Content security policy
   * https://report-uri.com/home/generate
   */
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self' data: 'unsafe-inline' w3.org w3.org/2000 w3.org/1999; script-src 'self'; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src data: 'self' 'unsafe-inline'; frame-src 'self';"
  );

  /**
   * HSTS
   */
  res.setHeader(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload'
  );

  /**
   * X-Content-Type-Options
   */
  res.setHeader('X-Content-Type-Options', 'nosniff');
  /**
   * X-Frame-Options
   */
  res.setHeader('X-Frame-Options', 'DENY');
  /**
   * Referrer-Policy
   */
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  /**
   *  Remove headers
   */
  res.removeHeader('x-powered-by');

  // Always call next()
  next();
});

/**
 * Swagger
 * https://github.com/scottie1984/swagger-ui-express/issues/120
 * https://stackoverflow.com/questions/69663117/do-not-render-try-it-out-button-and-enable-execute-button-in-swagger-ui
 */

const options = {
  explorer: true,
  swaggerOptions: {
    tryItOutEnabled: true,
  },
};

const swaggerFile = require('./swagger.json');

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile, options));

/**
 * Error handler
 */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(JSON.stringify(err));
});

/**
 * Express JSON middleware
 */
app.use(express.json());

/**
 * Person Routes
 */
const personRouter = require('./routers/personRouter');
app.use('/', personRouter);

/**
 * Info Routes
 */
const infoRouter = require('./routers/infoRouter');
app.use('/', infoRouter);

/**
 * Redirect root (/) to swagger
 */
app.get('/', (req, res) => {
  res.redirect('/doc');
});

/**
 * Start listening (HTTP only)
 */
app.listen(Port, () => {
  console.log(`Person API listening on port ${Port}`);
});
