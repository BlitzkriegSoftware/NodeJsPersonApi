'use strict';

/**
 * Environment Variables
 * @name   EnvironmentVariables
 * @module config/environmentvars
 */

const Default_Port = 30083; // My favorite port
const Default_Keep = 3; // number of files to keep
const Default_Rotate_File_Size = '5M'; // 5 Megabytes
const Default_Urls = 'http://localhost,https://localhost,';
const Default_Log_Rotate_Interval = '1h'; // 1 hour
const Default_Cors_Origins = '*'; // any
const Default_Cors_Methods = '*'; // any
const Default_InfoSec_Csp =
  "default-src 'self' data: 'unsafe-inline' w3.org w3.org/2000 w3.org/1999; script-src 'self'; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src data: 'self' 'unsafe-inline'; frame-src 'self';";
const Default_InfoSec_Sts = 'max-age=63072000; includeSubDomains; preload';
const Default_InfoSec_Xct = 'nosniff';
const Default_InfoSec_Xfo = 'DENY';
const Default_InfoSec_RFP = 'strict-origin-when-cross-origin';
const Default_InfoSec_Noh = 'x-powered-by,';

/**
 * Port to listen on
 * @description Environment Variable 'API_PORT'
 * @default 30083
 * @returns {Number}
 */
var port = parseInt(process.env.API_PORT, 10) ?? Default_Port;
if (!port || port <= 0) {
  port = Default_Port;
}

/**
 * Urls that the API runs on (w/o : port)
 * @description Environment Variable 'HOST_URLS'
 * @default @see {Default_Urls} - Localhost(s)
 * @returns {String} - Turned into an array of urls
 */
var urlstring = process.env.HOST_URLS ?? Default_Urls;
var urls = urlstring.split(',');

/**
 * Size of file to rotate
 * @description Environment Variable 'LOG_ROTATE_SIZE'
 * @see {@link https://www.npmjs.com/package/rotating-file-stream|rotating-file-stream}
 * @default 5M
 * @returns {String}
 */
var log_rotate_size = process.env.LOG_ROTATE_SIZE ?? Default_Rotate_File_Size;

/**
 * Rotate every N interval
 * @description  Environment Variable 'LOG_ROTATE_INTERVAL'
 * @see {@link https://www.npmjs.com/package/rotating-file-stream|rotating-file-stream}
 * @default 1h
 * @returns {String}
 */
var log_rotate_interval =
  process.env.LOG_ROTATE_INTERVAL ?? Default_Log_Rotate_Interval;

/**
 * Max rotated files to keep
 * @description Environment Variable 'LOG_ROTATE_MAXFILES'
 * @see {@link https://www.npmjs.com/package/rotating-file-stream|rotating-file-stream}
 * @default 3
 * @returns {Number}
 */
var log_rotate_maxfiles =
  parseInt(process.env.LOG_ROTATE_MAXFILES, 10) ?? Default_Keep;
if (!log_rotate_maxfiles || log_rotate_maxfiles <= 1) {
  log_rotate_maxfiles = Default_Keep;
}

/**
 * List of CORS Origins comma separated
 * @description Environment Variable 'CORS_ORIGINS'
 * @see {@link https://expressjs.com/en/resources/middleware/cors.html|CORS}
 * @default *
 * @returns {String} - See above
 */
var cors_origins = process.env.CORS_ORIGINS ?? Default_Cors_Origins;

/**
 * List of CORS Methods comma separated
 * @description Environment Variable 'CORE_METHODS'
 * @see {@link https://expressjs.com/en/resources/middleware/cors.html|CORS}
 * @default *
 * @returns {String} - See above
 */
var cors_methods = process.env.CORE_METHODS ?? Default_Cors_Methods;

/**
 * Content Security Policy
 * @description Environment Variable 'INFOSEC_CSP'
 * @see {@link https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html | OWASP Cheetsheet }
 * @default {String} - (restrictive)
 * @returns {String} - See above
 */
var infosec_csp = process.env.INFOSEC_CSP ?? Default_InfoSec_Csp;

/**
 * Strict transport security
 * @description Environment Variable 'INFOSEC_STS'
 * @see {@link https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html | OWASP Cheetsheet }
 * @default - As recomended by OWASP
 * @returns {String} - See above
 */
var infosec_sts = process.env.INFOSEC_STS ?? Default_InfoSec_Sts;

/**
 * X-Content-Type-Options
 * @description Environment Variable 'INFOSEC_XCT'
 * @see {@link https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html | OWASP Cheetsheet }
 * @default - As recomended by OWASP
 * @returns {String} - See above
 */
var infosec_xct = process.env.INFOSEC_XCT ?? Default_InfoSec_Xct;

/**
 * X-Frame-Options
 * @description Environment Variable 'INFOSEC_XFO'
 * @see {@link https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html | OWASP Cheetsheet }
 * @default - As recomended by OWASP
 * @returns {String} - See above
 */
var infosec_xfo = process.env.INFOSEC_XFO ?? Default_InfoSec_Xfo;

/**
 * Referrer-Policy
 * @description Environment Variable 'INFOSEC_RFP'
 * @see {@link https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html | OWASP Cheetsheet }
 * @default - As recomended by OWASP
 * @returns {String} - See above
 */
var infosec_rfp = process.env.INFOSEC_RFP ?? Default_InfoSec_RFP;

/**
 * List of headers to remove comma separated
 * @description Environment Variable 'INFOSEC_NOH'
 * @see {@link https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html | OWASP Cheetsheet }
 * @default - As recomended by OWASP
 * @returns {Array} - See above
 */
var infosec_nohstr = process.env.INFOSEC_NOH ?? Default_InfoSec_Noh;

var infosec_noh = [];
if (infosec_nohstr) {
  infosec_noh = infosec_nohstr.split(',');
}

module.exports = {
  Port: port,
  Log_Rotate_Size: log_rotate_size,
  Log_Rotate_Interval: log_rotate_interval,
  Log_Rotate_MaxFiles: log_rotate_maxfiles,
  Cors_Origins: cors_origins,
  Cors_Methods: cors_methods,
  Infosec_Csp: infosec_csp,
  Infosec_Sts: infosec_sts,
  Infosec_Xct: infosec_xct,
  Infosec_Xfo: infosec_xfo,
  Infosec_Rfp: infosec_rfp,
  Infosec_Noh: infosec_noh,
  Urls: urls,
};
