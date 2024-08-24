'use strict';

const path = require('path');
const fs = require('node:fs');
const validator = require('validator');

/**
 * Helpful static methods for use in any code
 * @module library/utility
 * @alias module:library/utility.Utility
 * @description General Purpose Utility
 * @class
 * @example
 * requires 'global.appRoot'
 */
module.exports = class Utility {
  /**
   * Creates a folder if it does not exist
   * @param {String} folder - Path to folder we want
   */
  static ensureFolderExists(folder) {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
  }

  /**
   * Tests if an object is a string
   * @param {Object} o
   * @returns {Boolean} - true if so
   */
  static isString(o) {
    return Object.prototype.toString.call(o) === '[object String]';
  }

  /**
   * Returns a 'safer' string
   * @param {String} text
   * @returns {String} - Trimmed, Cleaned up string
   */
  static toSafeString(text) {
    if (!text) {
      return '';
    }

    if (!Utility.Utility.isString(text)) {
      text = text.toString();
    }

    return validator.escape(validator.stripLow(text)).trim();
  }

  /**
   * Makes a string timestamp from a date
   * @param {Date} d - Date
   * @returns {String} - Timestamp from Date
   */
  static makeStamp(d) {
    const year = `${  d.getFullYear()}`;
    let month = `${  d.getMonth()}`;
    let day = `${  d.getDate()}`;
    let hour = `${  d.getHours()}`;
    let minute = `${  d.getMinutes()}`;
    let second = `${  d.getSeconds()}`;

    if (month.length < 2) month = `0${  month}`;
    if (day.length < 2) day = `0${  day}`;
    if (hour.length < 2) hour = `0${  hour}`;
    if (minute.length < 2) minute = `0${  minute}`;
    if (second.length < 2) second = `0${  second}`;

    return [year, month, day, hour, minute, second].join('-');
  }

  /**
   * Makes a rotating filename when called into '$/logs/', makes folder if not exists
   * @see {@link https://stackoverflow.com/questions/61650047/how-to-specify-rotated-file-location-by-using-rotating-file-stream|Log file path}
   * @param {*} time
   * @param {*} index
   */
  static logFilename(time, index) {
    const logFolder = path.join(global.appRoot, 'logs');
    Utility.Utility.ensureFolderExists(logFolder);
    const ext = '.log';
    let logFile = 'personapi.w3c';
    logFile = path.join(logFolder, logFile);
    if (!time) return logFile + ext;
    const stamp = Utility.Utility.makeStamp(time);
    logFile = [logFile, index, stamp, ext].join('-');
    return logFile;
  }

  /**
   * True if is falsy or just whitespace
   * @param {String} str
   * @returns {Boolean} isNullOrWhitespace
   */
  static isBlank(text) {
    return !text || /^\s*$/.test(text);
  }

  /**
   * True if prop exists and has a value
   * @param {Object} o
   * @param {String} prop
   * @returns {Boolean}
   */
  static propIsValid(o, prop) {
    let isOk = false;

    if (o == null || prop == null) {
      return isOk;
    }

    if (Object.hasOwn(o, prop)) {
      const value = String(o[prop]);
      if (value != null && value.length > 0) {
        isOk = true;
      }
    }
    return isOk;
  }
};
