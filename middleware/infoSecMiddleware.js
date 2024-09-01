'use strict';

const { tr } = require('@faker-js/faker');
const Utility = require('../library/utility');

/**
 * Infosec Policy Middleware
 * @see {@link https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html | Owasp Cheetsheet}
 * @module middleware/infosec
 * @param {Object} options
 * Fields:
 * - csp: Content security policy
 * - sts: Strict transport security
 * - xct: X-Content-Type-Options
 * - xfo: X-Frame-Options
 * - rfp: Referrer-Policy
 * - noh: {Array} of headers to remove
 * @example
 * // infoSec - variable assigned to function from requires
 * // infoSecOptions - object with properties above
 * var infoSec = require('./middleware/infoSecMiddleware.js');
 * var infoSecOptions = { }; // See parameters
 * app.use(infoSec(infoSecOptions));
 * @returns Middleware configured
 */
module.exports = function (options) {
  return function (req, res, next) {
    if (options != null) {
      /**
       * CSP - Content security policy
       * {@link https://report-uri.com/home/generate | CSP Generator}
       */
      if (Utility.propIsValid(options, 'csp')) {
        res.setHeader('Content-Security-Policy', options.csp);
      }

      /**
       * HSTS
       */
      if (Utility.propIsValid(options, 'sts')) {
        res.setHeader('Strict-Transport-Security', options.sts);
      }

      /**
       * X-Content-Type-Options
       */
      if (Utility.propIsValid(options, 'xct')) {
        res.setHeader('X-Content-Type-Options', options.xct);
      }

      /**
       * X-Frame-Options
       */
      if (Utility.propIsValid(options, 'xfo')) {
        res.setHeader('X-Frame-Options', options.xfo);
      }

      /**
       * Referrer-Policy
       */
      if (Utility.propIsValid(options, 'rfp')) {
        res.setHeader('Referrer-Policy', options.frp);
      }

      /**
       * X-Download-Options
       * @see { @info X-Download-Options: noopen | 'X-Download-Options}
       */
      res.setHeader('X-Download-Options', 'noopen');

      /**
       * Cross-Site Request Forgery Prevention
       * @see {@link https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html | XCSRF }
       * @see {@link https://www.npmjs.com/package/csrf-csrf | csrf }
       */
      const { doubleCsrf } = require('csrf-csrf');
      // TODO

      /**
       *  Remove banned headers
       */
      if (Utility.propIsValid(options, 'noh')) {
        if (Array.isArray(options.noh)) {
          for (const htr of options.noh) {
            if (htr) {
              res.removeHeader(htr);
            }
          }
        }
      }
    }
    next();
  };
};
