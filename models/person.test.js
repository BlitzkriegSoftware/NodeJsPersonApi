"use strict";

// https://jestjs.io/docs/getting-started
const { describe, expect, test } = require("@jest/globals");

const Person = require("./person");

test("makeperson", () => {
  var person = Person.makeperson();
  expect(person.isvalid()).toBe(true);
  expect(person.isBlank(person.company)).toBe(false);
  expect(person.isBlank(person.email)).toBe(false);
});
