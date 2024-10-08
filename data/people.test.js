'use strict';

// https://jestjs.io/docs/getting-started
const { describe, expect, test } = require('@jest/globals');

const PersonRepository = require('./people');

const Person = require('../models/person.js');
const { tr } = require('@faker-js/faker');

test('Data is inited', () => {
  expect(PersonRepository.Data != null).toBe(true);
  expect(PersonRepository.Data.length === 0).toBe(true);
});

test('Data hasData', () => {
  PersonRepository.Data = null;
  PersonRepository.reset();
  expect(PersonRepository.hasData()).toBe(false);
  PersonRepository.addSamples(1);
  expect(PersonRepository.hasData()).toBe(true);
});

test('Data can be filled', () => {
  let person = Person.makePerson();
  expect(person.isValid()).toBe(true);

  PersonRepository.Data.push(person);
  expect(PersonRepository.Data.length >= 1).toBe(true);

  person = Person.makePerson();
  PersonRepository.Data.push(person);
  expect(PersonRepository.Data.length >= 0).toBe(true);
});

test('Repository', () => {
  PersonRepository.reset();
  expect(PersonRepository.hasData()).toBe(false);

  let result = PersonRepository.addSamples(null);
  expect(result != null).toBe(true);
  expect(PersonRepository.hasData()).toBe(true);

  result = PersonRepository.addSamples(1);
  expect(result != null).toBe(true);
  expect(PersonRepository.hasData()).toBe(true);

  let person = PersonRepository.Data[0];
  expect(person != null).toBe(true);
  expect(person.isValid()).toBe(true);

  const words = person.toString();
  // console.log(words);
  expect(words != null).toBe(true);
  expect(words.indexOf(';') >= 0).toBe(true);

  let id = person.id;
  let sc = PersonRepository.addUpdate(person);
  expect(sc == 200).toBe(true);

  id = '1234';
  const p2 = PersonRepository.findById(id);
  expect(p2 == null).toBe(true);

  person.id = id;
  sc = PersonRepository.addUpdate(person);
  expect(sc == 201).toBe(true);

  sc = PersonRepository.addUpdate(null);
  expect(sc == 406).toBe(true);

  const o = {
    x: 'blah'
  };
  sc = PersonRepository.addUpdate(o);
  expect(sc == 400).toBe(true);

  id = person.id;
  sc = PersonRepository.delete(id);
  expect(sc == 200).toBe(true);

  id = '';
  sc = PersonRepository.delete(id);
  expect(sc == 404).toBe(true);

  id = 0;
  sc = PersonRepository.delete(id);
  expect(sc == 404).toBe(true);

  id = 'abcdef';
  sc = PersonRepository.delete(id);
  expect(sc == 404).toBe(true);

  sc = PersonRepository.delete(null);
  expect(sc == 404).toBe(true);

  person = PersonRepository.Data[0];
  id = person.id;
  result = PersonRepository.findById(id);
  expect(result != null).toBe(true);
  expect(result.isValid()).toBe(true);

  const text = person.lastname.substring(0, 2);
  result = PersonRepository.search(text);
  expect(result.length > 0).toBe(true);

  result = PersonRepository.search(null);
  expect(result.length > 0).toBe(false);

  result = PersonRepository.search(-99);
  if (result != null) {
    expect(result.length <= 0).toBe(true);
  }

  sc = PersonRepository.reset();
  expect(sc == 200).toBe(true);
});

test('findById', () => {
  let id = null;
  let results = PersonRepository.findById(id);
  expect(results == null).toBe(true);

  id = 'moo';
  results = PersonRepository.findById(id);
  expect(results == null).toBe(true);

  const folks = PersonRepository.addSamples(1);
  const person = folks[0];

  results = PersonRepository.findById(person.id);
  expect(results != null).toBe(true);
});
