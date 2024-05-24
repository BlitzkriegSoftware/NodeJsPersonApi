"use strict";

module.exports = class Status {
  constructor(message, data) {
    this.message = message;
    this.data = data;
  }

  static {
    this.message = "";
    this.data = null;
  }

  static toString(status) {
    var s = `${status.message};${status.data};`;
    return s;
  }

  tostring() {
    return Status.toString(this);
  }

  static fromjson(json) {
    var o = JSON.parse(json);
    // console.log(Object.getOwnPropertyNames(o));
    var p = new Status(o.message, o.data);

    return p;
  }

  isValid() {
    return !this.isBlank(this.message);
  }

  // Is falsy or just whitespace
  isBlank(str) {
    return !str || /^\s*$/.test(str);
  }
};
