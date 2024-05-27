'use strict';

/**
 * Library: Utility
 * static helper functions
 */
exports.Utility = (function () {
  return {
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
