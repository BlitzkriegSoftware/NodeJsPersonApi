'use strict';

// https://jestjs.io/docs/getting-started
const { describe, expect, test } = require('@jest/globals');
const Utility = require('../library/utility');

const Person = require('./person');

/**
 * TEST: Make Person generates valid People
 */
test('makePerson', () => {
  const person = Person.makePerson();
  expect(person.isValid()).toBe(true);
  expect(Utility.isBlank(person.company)).toBe(false);
  expect(Utility.isBlank(person.email)).toBe(false);
});

/**
 * TEST: format PERSON
 */
test('Person string', () => {
  const person = Person.makePerson();
  const text = person.toString();
  expect(text.includes(';')).toBe(true);
});

/**
 * TEST: From JSON
 */
test('fromJson', () => {
  let person = Person.makePerson();
  expect(person.isValid()).toBe(true);
  let json = JSON.stringify(person);
  let p2 = Person.fromJson(json);
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
  } catch (e) {
    console.log(e);
  }
  expect(p2 == null).toBe(true);
});

/**
 * TEST: From Object
 */
test('fromObject', () => {
  let person = Person.makePerson();
  expect(person.isValid()).toBe(true);
  let p2 = Person.fromObject(person);
  expect(p2.isValid()).toBe(true);
  expect(person.lastname == p2.lastname).toBe(true);
  expect(person.firstname == p2.firstname).toBe(true);
  expect(person.cellphone == p2.cellphone).toBe(true);
  expect(person.email == p2.email).toBe(true);
  expect(person.company == p2.company).toBe(true);

  person = null;
  try {
    const o = {};
    p2 = Person.fromObject(o);
  } catch (e) {}
  expect(p2.isValid()).toBe(false);

  person = null;
  try {
    const o = null;
    p2 = Person.fromObject(o);
  } catch (e) {}
  expect(p2 != null).toBe(false);
});
