'use strict';

const { tr } = require('@faker-js/faker');

/**
 * Infosec Policy Middleware
 * https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html
 * @param {Object} options
 * Fields:
 * - csp: Content security policy
 * - sts: Strict transport security
 * - xct: X-Content-Type-Options
 * - xfo: X-Frame-Options
 * - frp: Referrer-Policy
 * - noh: {Array} of headers to remove
 * @returns Middleware configured
 */
module.exports = function (options) {
  return function (req, res, next) {
    if (options != null) {
      /**
       * CSP - Content security policy
       * https://report-uri.com/home/generate
       */
      if (propIsValid(options, 'csp')) {
        res.setHeader('Content-Security-Policy', options.csp);
      }

      /**
       * HSTS
       */
      if (propIsValid(options, 'sts')) {
        res.setHeader('Strict-Transport-Security', options.sts);
      }

      /**
       * X-Content-Type-Options
       */
      if (propIsValid(options, 'xct')) {
        res.setHeader('X-Content-Type-Options', options.xct);
      }

      /**
       * X-Frame-Options
       */
      if (propIsValid(options, 'xfo')) {
        res.setHeader('X-Frame-Options', options.xfo);
      }

      /**
       * Referrer-Policy
       */
      if (propIsValid(options, 'frp')) {
        res.setHeader('Referrer-Policy', options.frp);
      }

      /**
       *  Remove banned headers
       */
      if (propIsValid(options, 'noh')) {
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

/**
 * True if prop exists and has a value
 * @param {Object} o
 * @param {String} prop
 * @returns {Boolean}
 */
function propIsValid(o, prop) {
  var isOk = false;
  if (Object.hasOwn(o, prop)) {
    var value = String(o[prop]);
    if (value != null && value.length > 0) {
      isOk = true;
    }
  }
  return isOk;
}
