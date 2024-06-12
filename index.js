'use strict';

/**
 * index.js - Entry Point for REST People API
 * @name   Index
 * @module ApplicationRoot
 */

/**
 * settings from environment variables
 */
const {
  Port,
  Log_Rotate_MaxFiles,
  Log_Rotate_Size,
  Log_Rotate_Interval,
  Cors_Origins,
  Cors_Methods,
  Infosec_Csp,
  Infosec_Sts,
  Infosec_Xct,
  Infosec_Xfo,
  Infosec_Rfp,
  Infosec_Noh,
  Urls,
  Size_Limit,
} = require('./config/ev.js');

/**
 * requires
 */
const swaggerUi = require('swagger-ui-express');
var morgan = require('morgan');
var fs = require('fs');
var path = require('path');
var Utility = require('./library/utility').Utility;

/**
 * Where is the app root folder?
 *@global
 */
global.appRoot = path.resolve(__dirname);

/**
 * Express setup
 */
const express = require('express');
const app = express();

/**
 * Logging file (rotating)
 * @example
 * Writing to a file is good for testing not so good in production
 */
const rfs = require('rotating-file-stream');
const accessLogStream = rfs.createStream(Utility.logFilename, {
  compress: 'gzip', // compress rotated files
  size: Log_Rotate_Size, // rotate every n MegaBytes written, adjust for your project
  interval: Log_Rotate_Interval, // rotate interval, adjust for your project
  maxFiles: Log_Rotate_MaxFiles, // max files, adjust for your project
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
const cors = require('cors');
const corsOptions = {
  origin: Cors_Origins,
  methods: Cors_Methods,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

/**
 * InfoSec Middleware
 * @see {@link https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html | OWASP Cheetsheet }
 */
var infoSec = require('./middleware/infoSecMiddleware.js');
var infoSecOptions = {
  csp: Infosec_Csp,
  sts: Infosec_Sts,
  xct: Infosec_Xct,
  xfo: Infosec_Xfo,
  rfp: Infosec_Rfp,
  noh: Infosec_Noh,
};
app.use(infoSec(infoSecOptions));

/**
 * HTTP Parameter Polution Prevention
 * @see {@link https://owasp.org/www-project-web-security-testing-guide/stable/4-Web_Application_Security_Testing/07-Input_Validation_Testing/04-Testing_for_HTTP_Parameter_Pollution.html | HPP}
 */
const hpp = require('hpp');
app.use(hpp());

/**
 * ExpectCT is deprecated!
 *  @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Expect-CT | Expect-CT}
 */

/**
 * Enforce no-cache
 * @see {@link https://www.npmjs.com/package/nocache | nocache}
 */
const nocache = require('nocache');
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
app.use(express.json({ limit: Size_Limit }));

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
  console.log(`Person API listening on port ${Port}`);
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
