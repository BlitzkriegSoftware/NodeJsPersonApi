"use strict";

// https://jestjs.io/docs/getting-started
const { describe, expect, test } = require("@jest/globals");

const Status = require("./status");

test("basic status", () => {
  var data = {
    x: "X",
    y: "Y",
  };
  var status = new Status("test", data);

  expect(status.isValid()).toBe(true);

  var json = JSON.stringify(status);
  var p2 = Status.fromjson(json);
  expect(p2.isValid()).toBe(true);
  expect(status.message == p2.message).toBe(true);
  expect(status.data != null).toBe(true);
});
