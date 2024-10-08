// // 'use strict';

/**
 * index.js - Entry Point for REST People API
 * @name   Index
 * @module ApplicationRoot
 */

const path = require('path');
/**
 * Where is the app root folder?
 *@global
 */
global.appRoot = path.resolve(__dirname);

/**
 * requires
 */

const swaggerUi = require('swagger-ui-express');

const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const express = require('express');
const hpp = require('hpp');
const nocache = require('nocache');
const cors = require('cors');

const utility = require('./library/utility');
const OpenApi3Generation = require('./library/swagger.js');
const infoSec = require('./middleware/infoSecMiddleware.js');

/**
 * Orderly shutdown
 */
function shutdown() {
  // Do other shut down tasks
  process.exit(0);
}

const main = async () => {
  /**
   * Fetch Configuration
   */
  const EnvironmentConfiguration = require('./config/ev.js');
  const config = new EnvironmentConfiguration();

  /**
   * Generate Swagger (OpenApi3)
   */
  const generator = new OpenApi3Generation();
  const filename = await generator.generate('', config.Urls, config.Port);

  /**
   * Logging file (rotating)
   * @example
   * Writing to a file is good for testing not so good in production
   */
  const accessLogStream = rfs.createStream(utility.logFilename, {
    compress: 'gzip', // compress rotated files
    size: config.Log_Rotate_Size, // rotate every n MegaBytes written, adjust for your project
    interval: config.Log_Rotate_Interval, // rotate interval, adjust for your project
    maxFiles: config.Log_Rotate_MaxFiles // max files, adjust for your project
  });

  /**
   * Set up Express (app)
   */
  const app = express();

  /**
   * Logging
   */
  app.use(morgan('combined', { stream: accessLogStream }));

  /**
   * CORS
   * @see {@link https://dev.to/speaklouder/how-to-configure-cors-in-nodejs-with-express-11h|cors}
   * @example
   * These are not good setting for production, in reality,
   * 'origin' and 'methods' should always be restritive as possible
   */

  const corsOptions = {
    origin: config.Cors_Origins,
    methods: config.Cors_Methods,
    preflightContinue: false,
    optionsSuccessStatus: 204
  };
  app.use(cors(corsOptions));

  /**
   * InfoSec Middleware
   * @see {@link https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html | OWASP Cheetsheet }
   */

  const infoSecOptions = {
    csp: config.Infosec_Csp,
    sts: config.Infosec_Sts,
    xct: config.Infosec_Xct,
    xfo: config.Infosec_Xfo,
    rfp: config.Infosec_Rfp,
    noh: config.Infosec_Noh
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
      tryItOutEnabled: true
    }
  };
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile, options));

  /**
   * Enables Json to Object translation
   */
  app.use(express.json({ limit: config.Size_Limit }));

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
  const ErrorHandler = require('./middleware/errorHandler.js');
  const { stringify } = require('querystring');
  app.use(ErrorHandler);

  /**
   * Start listening (HTTP only)
   */
  app.listen(config.Port, () => {
    console.log(`Person API listening on port ${config.Port}`);
  });
};

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

main();
