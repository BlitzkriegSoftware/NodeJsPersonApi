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
var morgan = require('morgan');
var fs = require('fs');
var path = require('path');
const rfs = require('rotating-file-stream');

/**
 * Express setup
 */
const express = require('express');
const app = express();

/**
 * Logging file (rotating)
 */

var logFolder = path.join('.', 'logs');
var logFile = path.join(logFolder, 'personapi.log');

if (!fs.existsSync(logFolder)) {
  fs.mkdirSync(logFolder);
}

const accessLogStream = rfs.createStream(logFile, {
  size: '5M', // rotate every 10 MegaBytes written
  interval: '1h', // rotate daily
  compress: 'gzip', // compress rotated files
});

/**
 * Logging
 */
app.use(morgan('combined', { stream: accessLogStream }));

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

/**
 * InfoSec Middleware
 * https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html
 */
var infoSec = require('./middleware/infoSecMiddleware.js');
var infoSecOptions = {
  csp: "default-src 'self' data: 'unsafe-inline' w3.org w3.org/2000 w3.org/1999; script-src 'self'; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src data: 'self' 'unsafe-inline'; frame-src 'self';",
  sts: 'max-age=63072000; includeSubDomains; preload',
  xct: 'nosniff',
  xfo: 'DENY',
  rfp: 'strict-origin-when-cross-origin',
  noh: ['x-powered-by'],
};
app.use(infoSec(infoSecOptions));

/**
 * Swagger
 * https://github.com/scottie1984/swagger-ui-express/issues/120
 * https://stackoverflow.com/questions/69663117/do-not-render-try-it-out-button-and-enable-execute-button-in-swagger-ui
 */
const swaggerFile = require('./swagger.json');
const options = {
  explorer: true,
  swaggerOptions: {
    tryItOutEnabled: true,
  },
};
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile, options));

/**
 * Enables Json to Object translation
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
 * Error handler, should go right above listen!
 */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(JSON.stringify(err));
});

/**
 * Start listening (HTTP only)
 */
app.listen(Port, () => {
  console.log(`Person API listening on port ${Port}`);
});
