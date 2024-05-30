'use strict';

const { tr } = require('@faker-js/faker');
var Utility = require('../library/utility').Utility;

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
 * - frp: Referrer-Policy
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
      if (Utility.propIsValid(options, 'frp')) {
        res.setHeader('Referrer-Policy', options.frp);
      }

      /**
       *  Remove banned headers
       */
      if (Utility.propIsValid(options, 'noh')) {
        if (Array.isArray(options.noh)) {
          for (var htr of options.noh) {
            res.removeHeader(htr);
          }
        }
      }
    }
    next();
  };
};
