'use strict';

/**
 * Environment Variables
 * @alias   EnvironmentVariables
 * @class
 */
module.exports = class EnvironmentConfiguration {
  /**
   * CTOR
   * @alias   EnvironmentVariables
   * @constructor
   */
  constructor() {
    /**
     * Default: Port
     * @default 30083
     */
    const Default_Port = 30083;
    /**
     * Default: Number of log files to keep
     * @default 3
     */
    const Default_Keep = 3;
    /**
     * Default: Rotate log at N Megabytes
     * @default 5M
     */
    const Default_Rotate_File_Size = '5M';
    /**
     * Default: URLs to use for generation
     * @default http, https
     */
    const Default_Urls = 'http://localhost,https://localhost,';
    /**
     * Default: Log Rotatee Interval
     * @default 1h
     */
    const Default_Log_Rotate_Interval = '1h';
    /**
     * Default: CORS Origins
     * @default *
     */
    const Default_Cors_Origins = '*';
    /**
     * Default: CORS Methods
     * @default *
     */
    const Default_Cors_Methods = '*';
    /**
     * Default: InfoSec - Content Security Policy
     * @default '(see source)'
     */
    const Default_InfoSec_Csp =
      "default-src 'self' data: 'unsafe-inline' w3.org w3.org/2000 w3.org/1999; script-src 'self'; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src data: 'self' 'unsafe-inline'; frame-src 'self';";
    /**
     * Default: InfoSec - Strict Transport Security
     * @default '(see source)'
     */
    const Default_InfoSec_Sts = 'max-age=63072000; includeSubDomains; preload';
    /**
     * Default: InfoSec - X-Content-Type-Options
     * @default '(see source)'
     */
    const Default_InfoSec_Xct = 'nosniff';
    /**
     * Default: InfoSec - X-Frame-Options
     * @default '(see source)'
     */
    const Default_InfoSec_Xfo = 'DENY';
    /**
     * Default: InfoSec - Referrer-Policy
     * @default '(see source)'
     */
    const Default_InfoSec_RFP = 'strict-origin-when-cross-origin';
    /**
     * Default: InfoSec - Headers to Remove
     * @default '(see source)'
     */
    const Default_InfoSec_Noh = 'x-powered-by,Server,';
    /**
     * Default: InfoSec -Request Size Limit
     * @default 2kb
     */
    const Default_Request_Size_Limit = '2kb';

    /**
     * Port to listen on
     * @description Environment Variable 'API_PORT'
     * @default 30083
     * @returns {Number}
     */
    this.port = parseInt(process.env.API_PORT, 10) || Default_Port;

    /**
     * Urls that the API runs on (w/o : port)
     * @description Environment Variable 'HOST_URLS'
     * @default @see {Default_Urls} - Localhost(s)
     * @returns {String} - Turned into an array of urls
     */
    const urlstring = process.env.HOST_URLS || Default_Urls;
    this.urls = urlstring.split(',');

    /**
     * Size of file to rotate
     * @description Environment Variable 'LOG_ROTATE_SIZE'
     * @see {@link https://www.npmjs.com/package/rotating-file-stream|rotating-file-stream}
     * @default 5M
     * @returns {String}
     */
    this.log_rotate_size =
      process.env.LOG_ROTATE_SIZE || Default_Rotate_File_Size;

    /**
     * Rotate every N interval
     * @description  Environment Variable 'LOG_ROTATE_INTERVAL'
     * @see {@link https://www.npmjs.com/package/rotating-file-stream|rotating-file-stream}
     * @default 1h
     * @returns {String}
     */
    this.log_rotate_interval =
      process.env.LOG_ROTATE_INTERVAL || Default_Log_Rotate_Interval;

    /**
     * Max rotated files to keep
     * @description Environment Variable 'LOG_ROTATE_MAXFILES'
     * @see {@link https://www.npmjs.com/package/rotating-file-stream|rotating-file-stream}
     * @default 3
     * @returns {Number}
     */
    this.log_rotate_maxfiles =
      parseInt(process.env.LOG_ROTATE_MAXFILES, 10) || Default_Keep;

    /**
     * List of CORS Origins comma separated
     * @description Environment Variable 'CORS_ORIGINS'
     * @see {@link https://expressjs.com/en/resources/middleware/cors.html|CORS}
     * @default *
     * @returns {String} - See above
     */
    this.cors_origins = process.env.CORS_ORIGINS || Default_Cors_Origins;

    /**
     * List of CORS Methods comma separated
     * @description Environment Variable 'CORE_METHODS'
     * @see {@link https://expressjs.com/en/resources/middleware/cors.html|CORS}
     * @default *
     * @returns {String} - See above
     */
    this.cors_methods = process.env.CORE_METHODS || Default_Cors_Methods;

    /**
     * Content Security Policy
     * @description Environment Variable 'INFOSEC_CSP'
     * @see {@link https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html | OWASP Cheetsheet }
     * @default {String} - (restrictive)
     * @returns {String} - See above
     */
    this.infosec_csp = process.env.INFOSEC_CSP || Default_InfoSec_Csp;

    /**
     * Strict transport security
     * @description Environment Variable 'INFOSEC_STS'
     * @see {@link https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html | OWASP Cheetsheet }
     * @default - As recomended by OWASP
     * @returns {String} - See above
     */
    this.infosec_sts = process.env.INFOSEC_STS || Default_InfoSec_Sts;

    /**
     * X-Content-Type-Options
     * @description Environment Variable 'INFOSEC_XCT'
     * @see {@link https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html | OWASP Cheetsheet }
     * @default - As recomended by OWASP
     * @returns {String} - See above
     */
    this.infosec_xct = process.env.INFOSEC_XCT || Default_InfoSec_Xct;

    /**
     * X-Frame-Options
     * @description Environment Variable 'INFOSEC_XFO'
     * @see {@link https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html | OWASP Cheetsheet }
     * @default - As recomended by OWASP
     * @returns {String} - See above
     */
    this.infosec_xfo = process.env.INFOSEC_XFO || Default_InfoSec_Xfo;

    /**
     * Referrer-Policy
     * @description Environment Variable 'INFOSEC_RFP'
     * @see {@link https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html | OWASP Cheetsheet }
     * @default - As recomended by OWASP
     * @returns {String} - See above
     */
    this.infosec_rfp = process.env.INFOSEC_RFP || Default_InfoSec_RFP;

    /**
     * List of headers to remove comma separated
     * @description Environment Variable 'INFOSEC_NOH'
     * @see {@link https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html | OWASP Cheetsheet }
     * @default - As recomended by OWASP
     * @returns {Array} - See above
     */
    const infosec_nohstr = process.env.INFOSEC_NOH || Default_InfoSec_Noh;
    this.infosec_noh = [];
    if (infosec_nohstr) {
      this.infosec_noh = infosec_nohstr.split(',');
    }

    /**
     * Maximum JSON Request Size Limit
     * @description Environment Variable 'REQ_SIZE_LIMIT'
     * @see {@link https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html | OWASP Cheetsheet }
     * @default - As recomended by OWASP
     * @returns {String} - See above
     */
    this.size_limit = process.env.REQ_SIZE_LIMIT || Default_Request_Size_Limit;
  }

  /**
   * Port to listen on
   * @description Environment Variable 'API_PORT'
   * @default 30083
   * @returns {Number}
   * @function
   * @name EnvironmentVariables#Port
   */
  get Port() {
    return this.port;
  }

  /**
   * Size of file to rotate
   * @description Environment Variable 'LOG_ROTATE_SIZE'
   * @see {@link https://www.npmjs.com/package/rotating-file-stream|rotating-file-stream}
   * @default 5M
   * @returns {String}
   * @function
   * @name EnvironmentVariables#Log_Rotate_Size
   */
  get Log_Rotate_Size() {
    return this.log_rotate_size;
  }

  /**
   * Rotate every N interval
   * @description  Environment Variable 'LOG_ROTATE_INTERVAL'
   * @see {@link https://www.npmjs.com/package/rotating-file-stream|rotating-file-stream}
   * @default 1h
   * @returns {String}
   * @function
   * @name EnvironmentVariables#Log_Rotate_Interval
   */
  get Log_Rotate_Interval() {
    return this.log_rotate_interval;
  }

  /**
   * Max rotated files to keep
   * @description Environment Variable 'LOG_ROTATE_MAXFILES'
   * @see {@link https://www.npmjs.com/package/rotating-file-stream|rotating-file-stream}
   * @default 3
   * @returns {Number}
   * @function
   * @name EnvironmentVariables#Log_Rotate_MaxFiles
   */
  get Log_Rotate_MaxFiles() {
    return this.log_rotate_maxfiles;
  }

  /**
   * List of CORS Origins comma separated
   * @description Environment Variable 'CORS_ORIGINS'
   * @see {@link https://expressjs.com/en/resources/middleware/cors.html|CORS}
   * @default *
   * @returns {String} - See above
   * @function
   * @name EnvironmentVariables#Cors_Origins
   */
  get Cors_Origins() {
    return this.cors_origins;
  }

  /**
   * List of CORS Methods comma separated
   * @description Environment Variable 'CORE_METHODS'
   * @see {@link https://expressjs.com/en/resources/middleware/cors.html|CORS}
   * @default *
   * @returns {String} - See above
   * @function
   * @name EnvironmentVariables#Cors_Methods
   */
  get Cors_Methods() {
    return this.cors_methods;
  }

  /**
   * Content Security Policy
   * @description Environment Variable 'INFOSEC_CSP'
   * @see {@link https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html | OWASP Cheetsheet }
   * @default {String} - (restrictive)
   * @returns {String} - See above
   * @function
   * @name EnvironmentVariables#Infosec_Csp
   */
  get Infosec_Csp() {
    return this.infosec_csp;
  }

  /**
   * Strict transport security
   * @description Environment Variable 'INFOSEC_STS'
   * @see {@link https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html | OWASP Cheetsheet }
   * @default - As recomended by OWASP
   * @returns {String} - See above
   * @function
   * @name EnvironmentVariables#Infosec_Sts
   */
  get Infosec_Sts() {
    return this.infosec_sts;
  }

  /**
   * X-Content-Type-Options
   * @description Environment Variable 'INFOSEC_XCT'
   * @see {@link https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html | OWASP Cheetsheet }
   * @default - As recomended by OWASP
   * @returns {String} - See above
   * @function
   * @name EnvironmentVariables#Infosec_Xct
   */
  get Infosec_Xct() {
    return this.infosec_xct;
  }

  /**
   * X-Frame-Options
   * @description Environment Variable 'INFOSEC_XFO'
   * @see {@link https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html | OWASP Cheetsheet }
   * @default - As recomended by OWASP
   * @returns {String} - See above
   * @function
   * @name EnvironmentVariables#Infosec_Xfo
   */
  get Infosec_Xfo() {
    return this.infosec_xfo;
  }

  /**
   * Referrer-Policy
   * @description Environment Variable 'INFOSEC_RFP'
   * @see {@link https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html | OWASP Cheetsheet }
   * @default - As recomended by OWASP
   * @returns {String} - See above
   * @function
   * @name EnvironmentVariables#Infosec_Rfp
   */
  get Infosec_Rfp() {
    return this.infosec_rfp;
  }

  /**
   * List of headers to remove comma separated
   * @description Environment Variable 'INFOSEC_NOH'
   * @see {@link https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html | OWASP Cheetsheet }
   * @default - As recomended by OWASP
   * @returns {Array} - See above
   * @function
   * @name EnvironmentVariables#Infosec_Noh
   */
  get Infosec_Noh() {
    return this.infosec_noh;
  }

  /**
   * Urls that the API runs on (w/o : port)
   * @description Environment Variable 'HOST_URLS'
   * @default @see {Default_Urls} - Localhost(s)
   * @returns {String} - Turned into an array of urls
   * @function
   * @name EnvironmentVariables#Urls
   */
  get Urls() {
    return this.urls;
  }

  /**
   * Maximum JSON Request Size Limit
   * @description Environment Variable 'REQ_SIZE_LIMIT'
   * @see {@link https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html | OWASP Cheetsheet }
   * @default - As recomended by OWASP
   * @returns {String} - See above
   * @function
   * @name EnvironmentVariables#Size_Limit
   */
  get Size_Limit() {
    return this.size_limit;
  }
};
