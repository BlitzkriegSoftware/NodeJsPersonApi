'use strict';

const path = require('path');
const fs = require('node:fs');
const Utility = require('../library/utility.js');

/**
 * Helpful static methods for use in any code
 * @name Utility
 * @module library/utility
 * @description requires 'global.appRoot'
 */

exports.Utility = (function () {
  return {
    /**
     * Creates a folder if it does not exist
     * @param {String} folder - Path to folder we want
     */
    ensureFolderExists: function (folder) {
      if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
      }
    },

    /**
     * Makes a string timestamp from a date
     * @param {Date} d - Date
     * @returns {String} - Timestamp from Date
     */
    makeStamp: function (d) {
      var month = '' + (d.getMonth() + 1);
      var day = '' + d.getDate();
      var year = d.getFullYear();
      var hour = d.getHours();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      if (hour.length < 2) hour = '0' + hour;

      return [year, month, day, hour].join('-');
    },

    /**
     * Makes a rotating filename when called into '$/logs/', makes folder if not exists
     * @see {@link https://stackoverflow.com/questions/61650047/how-to-specify-rotated-file-location-by-using-rotating-file-stream|Log file path}
     * @param {*} time
     * @param {*} index
     */
    logFilename: function (time, index) {
      var logFolder = path.join(global.appRoot, 'logs');
      if (!fs.existsSync(logFolder)) {
        fs.mkdirSync(logFolder);
      }
      var logFile = 'personapi.w3c.log';
      logFile = path.join(logFolder, logFile);
      if (!time) return logFile;
      var stamp = Utility.Utility.makeStamp(time);
      logFile = [logFile, index, stamp].join('-');
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
