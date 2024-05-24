"use strict";

// https://jestjs.io/docs/getting-started
const { describe, expect, test } = require("@jest/globals");

const Person = require("./person");

test("makeperson", () => {
  var person = Person.makePerson();
  expect(person.isValid()).toBe(true);
  expect(person.isBlank(person.company)).toBe(false);
  expect(person.isBlank(person.email)).toBe(false);
});

test("fromjson", () => {
  var person = Person.makePerson();
  expect(person.isValid()).toBe(true);
  var json = JSON.stringify(person);
  var p2 = Person.fromJson(json);
  expect(p2.isValid()).toBe(true);
  expect(person.lastname == p2.lastname).toBe(true);
  expect(person.firstname == p2.firstname).toBe(true);
  expect(person.cellphone == p2.cellphone).toBe(true);
  expect(person.email == p2.email).toBe(true);
  expect(person.company == p2.company).toBe(true);
});
