'use strict';

/**
 * index.js - Entry Point for REST People API
 * @name   Index
 * @module ApplicationRoot
 */

const EnvironmentConfiguration = require('./config/ev.js');

/**
 * requires
 */
const swaggerUi = require('swagger-ui-express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const utility = require('./library/utility');
const generator = require('./library/swagger.js');
const rfs = require('rotating-file-stream');
const express = require('express');
const app = express();
const hpp = require('hpp');
const infoSec = require('./middleware/infoSecMiddleware.js');
const nocache = require('nocache');
const cors = require('cors');

/**
 * Where is the app root folder?
 *@global
 */
global.appRoot = path.resolve(__dirname);

/**
 * Fetch Configuration
 */
var config = new EnvironmentConfiguration();

/**
 * Generate Swagger (OpenApi3)
 */
var filename = generator.generate(config.Urls, config.Port);
if (filename.length <= 0) {
  exit(9);
}

/**
 * Logging file (rotating)
 * @example
 * Writing to a file is good for testing not so good in production
 */
const accessLogStream = rfs.createStream(utility.logFilename, {
  compress: 'gzip', // compress rotated files
  size: config.Log_Rotate_Size(), // rotate every n MegaBytes written, adjust for your project
  interval: config.Log_Rotate_Interval(), // rotate interval, adjust for your project
  maxFiles: config.Log_Rotate_MaxFiles(), // max files, adjust for your project
});

/**
 * Logging
 */
app.use(morgan('combined', { stream: accessLogStream }));

/**
 * CORS
 * @see {@link https://dev.to/speaklouder/how-to-configure-cors-in-nodejs-with-express-11h|cors}
 * @example
 * These are not good setting for production, in reality, 'origin' and 'methods' should always be restritive as possible
 */

const corsOptions = {
  origin: config.Cors_Origins(),
  methods: config.Cors_Methods(),
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

/**
 * InfoSec Middleware
 * @see {@link https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html | OWASP Cheetsheet }
 */

var infoSecOptions = {
  csp: config.Infosec_Csp(),
  sts: config.Infosec_Sts(),
  xct: config.Infosec_Xct(),
  xfo: config.Infosec_Xfo(),
  rfp: config.Infosec_Rfp(),
  noh: config.Infosec_Noh(),
};
app.use(infoSec(infoSecOptions));

/**
 * HTTP Parameter Polution Prevention
 * @see {@link https://owasp.org/www-project-web-security-testing-guide/stable/4-Web_Application_Security_Testing/07-Input_Validation_Testing/04-Testing_for_HTTP_Parameter_Pollution.html | HPP}
 */

app.use(hpp());

/**
 * ExpectCT is deprecated!
 *  @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Expect-CT | Expect-CT}
 */

/**
 * Enforce no-cache
 * @see {@link https://www.npmjs.com/package/nocache | nocache}
 */

app.use(nocache());

/**
 * Swagger
 * @see {@link  https://github.com/scottie1984/swagger-ui-express/issues/120 | swagger docs }
 * @see {@link  https://stackoverflow.com/questions/69663117/do-not-render-try-it-out-button-and-enable-execute-button-in-swagger-ui | customize swagger }
 */
const swaggerFile = require('./swagger.json');
const options = {
  explorer: false,
  swaggerOptions: {
    tryItOutEnabled: true,
  },
};
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile, options));

/**
 * Enables Json to Object translation
 */
app.use(express.json({ limit: config.Size_Limit() }));

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
  res.redirect('/swagger');
});

/**
 * Error handler, should go right above listen!
 * Must be last Use
 */
var ErrorHandler = require('./middleware/errorHandler.js');
const { stringify } = require('querystring');
app.use(ErrorHandler);

/**
 * Start listening (HTTP only)
 */
app.listen(Port, () => {
  console.log(`Person API listening on port ${config.Port()}`);
});

/**
 * handle SIGINT signals gracefully
 */
process.on('SIGINT', () => {
  const msg = 'Received SIGINT, performing graceful shutdown.';
  console.log(JSON.stringify(msg));
  shutdown();
});

/**
 * handle SIGTERM signals gracefully
 */
process.on('SIGTERM', () => {
  const msg = 'Received SIGTERM, performing graceful shutdown.';
  console.log(JSON.stringify(msg));
  shutdown();
});

/**
 * handle SIGQUIT signals gracefully
 */
process.on('SIGQUIT', () => {
  const msg = 'Received SIGQUIT, performing graceful shutdown.';
  console.log(JSON.stringify(msg));
  shutdown();
});

/**
 * Orderly shutdown
 */
function shutdown() {
  // Do other shut down tasks
  process.exit();
}
