'use strict';

const Utility = require('../library/utility');

/**
 * @module models/Result
 * @name Result
 * @class
 * @classdesc Model of a Result in our System
 */
module.exports = class Result {
  /**
   * CTOR, these are the fields
   * @alias Result#constructor
   * @function
   * @param {String} - message
   * @param {Any} - error
   * @returns {Result} - result class
   */
  constructor(message, error) {
    this.messagge = message;
    this.error = error;
  }

  /**
   * Semi-Colon separated list of fields for debugging
   * @static
   * @memberof Result
   * @alias Result.toString - ({Result})
   * @param {Class} result
   * @returns {String}
   */
  static toString(result) {
    const s = `${result.message};${result.error}`;
    return s;
  }

  /**
   * For this instance return a Semi-Colon separated list of fields for debugging
   * @instance
   * @memberof Result
   * @alias Result.toString - Self
   * @returns {String}
   */
  toString() {
    return Result.toString(this);
  }
};
