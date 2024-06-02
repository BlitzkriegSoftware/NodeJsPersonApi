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
  res.redirect('/swagger');
});

/**
 * Error handler, should go right above listen!
 * Must be last Use
 */
var ErrorHandler = require('./middleware/errorHandler.js');
app.use(ErrorHandler);

/**
 * Start listening (HTTP only)
 */
app.listen(Port, () => {
  console.log(`Person API listening on port ${Port}`);
});
