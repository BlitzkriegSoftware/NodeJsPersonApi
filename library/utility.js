'use strict';

const path = require('path');
const fs = require('node:fs');
const Utility = require('../library/utility.js');

/**
 * Helpful static methods for use in any code
 * @module library/utility
 * @alias module:library/utility.Utility
 * @description General Purpose Utility
 * @example
 * requires 'global.appRoot'
 * @example
 * var Utility = require('./library/utility').Utility;
 */
exports.Utility = (function () {
  return {
    /**
     * Creates a folder if it does not exist
     * @param {String} folder - Path to folder we want
     */
    ensureFolderExists: function (folder) {
      if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
      }
    },

    /**
     * Makes a string timestamp from a date
     * @param {Date} d - Date
     * @returns {String} - Timestamp from Date
     */
    makeStamp: function (d) {
      var year = '' + d.getFullYear();
      var month = '' + d.getMonth();
      var day = '' + d.getDate();
      var hour = '' + d.getHours();
      var minute = '' + d.getMinutes();
      var second = '' + d.getSeconds();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      if (hour.length < 2) hour = '0' + hour;
      if (minute.length < 2) minute = '0' + minute;
      if (second.length < 2) second = '0' + second;

      return [year, month, day, hour, minute, second].join('-');
    },

    /**
     * Makes a rotating filename when called into '$/logs/', makes folder if not exists
     * @see {@link https://stackoverflow.com/questions/61650047/how-to-specify-rotated-file-location-by-using-rotating-file-stream|Log file path}
     * @param {*} time
     * @param {*} index
     */
    logFilename: function (time, index) {
      var logFolder = path.join(global.appRoot, 'logs');
      Utility.Utility.ensureFolderExists(logFolder);
      var ext = '.log';
      var logFile = 'personapi.w3c';
      logFile = path.join(logFolder, logFile);
      if (!time) return logFile + ext;
      var stamp = Utility.Utility.makeStamp(time);
      logFile = [logFile, index, stamp, ext].join('-');
      return logFile;
    },

    /**
     * True if is falsy or just whitespace
     * @param {String} str
     * @returns {Boolean} isNullOrWhitespace
     */
    isBlank: function (text) {
      return !text || /^\s*$/.test(text);
    },

    /**
     * True if prop exists and has a value
     * @param {Object} o
     * @param {String} prop
     * @returns {Boolean}
     */
    propIsValid: function (o, prop) {
      var isOk = false;

      if (o == null || prop == null) {
        return isOk;
      }

      if (Object.hasOwn(o, prop)) {
        var value = String(o[prop]);
        if (value != null && value.length > 0) {
          isOk = true;
        }
      }
      return isOk;
    },
  };
})();
