'use strict';

// https://jestjs.io/docs/getting-started
const { describe, expect, test } = require('@jest/globals');

const Person = require('./person');

/**
 * TEST: Make Person generates valid People
 */
test('makePerson', () => {
  var person = Person.makePerson();
  expect(person.isValid()).toBe(true);
  expect(person.isBlank(person.company)).toBe(false);
  expect(person.isBlank(person.email)).toBe(false);
});

/**
 * TEST: format PERSON
 */
test('Person string', () => {
  var person = Person.makePerson();
  var text = person.toString();
  expect(text.includes(';')).toBe(true);
});

/**
 * TEST: From JSON
 */
test('fromJson', () => {
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

  person = null;
  try {
    json = JSON.stringify(person);
    p2 = Person.fromJson(json);
  } catch {}
  expect(p2 == null).toBe(true);
});

/**
 * TEST: From Object
 */
test('fromObject', () => {
  var person = Person.makePerson();
  expect(person.isValid()).toBe(true);
  var p2 = Person.fromObject(person);
  expect(p2.isValid()).toBe(true);
  expect(person.lastname == p2.lastname).toBe(true);
  expect(person.firstname == p2.firstname).toBe(true);
  expect(person.cellphone == p2.cellphone).toBe(true);
  expect(person.email == p2.email).toBe(true);
  expect(person.company == p2.company).toBe(true);

  person = null;
  try {
    var o = {};
    p2 = Person.fromObject(o);
  } catch {}
  expect(p2.isValid()).toBe(false);

  person = null;
  try {
    var o = null;
    p2 = Person.fromObject(o);
  } catch {}
  expect(p2 != null).toBe(false);
});
