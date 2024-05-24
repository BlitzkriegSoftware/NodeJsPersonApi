"use strict";

// https://jestjs.io/docs/getting-started
const { describe, expect, test } = require("@jest/globals");

const Data = require("./people.js");
const Person = require("../models/person.js");

test("Data is inited", () => {
  expect(Data != null).toBe(true);
  expect(Data.length === 0).toBe(true);
});

test("Data can be filled", () => {
  var person = Person.makePerson();
  expect(person.isValid()).toBe(true);

  Data.push(person);
  expect(Data.length == 1).toBe(true);

  person = Person.makePerson();
  Data.push(person);
  expect(Data.length == 2).toBe(true);
});
