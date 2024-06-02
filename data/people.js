'use strict';

const Max_Int32 = 2147483647;
const Default_HowMany = 3;
var validator = require('validator');
const Person = require('../models/person');
var Utility = require('../library/utility').Utility;

/**
 * Repository of Person
 * @module repository/people
 * @alias module:repository/people.PersonRepository
 * @description Not production quality, but repositories are a good pattern
 * @see {@link https://github.com/validatorjs/validator.js | Validator}
 * @example
 * const PersonRepository = require('./data/people');
 * // id is the key to a person
 * var p = PersonRepository.findById(id);
 */
module.exports = class PersonRepository {
  /**
   * Data Array
   * alias module:repository/people.Data
   */
  static Data = [];

  // Has Data
  /**
   * Does the Data array have any items?
   * alias module:repository/people.hasData
   * @returns {boolean}
   */
  /* istanbul ignore next */
  static hasData() {
    if (!PersonRepository.Data) {
      PersonRepository.reset();
    }
    return PersonRepository.Data.length > 0;
  }

  /**
   * Empties Array
   * alias module:repository/people.reset
   * @returns {200}
   */
  static reset() {
    PersonRepository.Data = [];
    return 200;
  }

  /**
   * find by id
   * @param {String} id - Id of person to find
   * @returns {Person | null}
   */
  static findById(id) {
    if (id == null) {
      id = '0';
    }

    if (!validator.isInt(id, { min: 1, max: Max_Int32 })) {
      id = '0';
    }

    const results = PersonRepository.Data.filter((person) => person.id == id);
    if (results.length > 0) {
      return results[0];
    } else {
      return null;
    }
  }

  /**
   * Search fields for text
   * @param {String} - text
   * @returns {Array} - of {People} (can be empty)
   */
  static search(text) {
    text = '' + text;
    text = Utility.toSafeString(text).toLowerCase();

    if (text.length <= 0) {
      return [];
    }

    var results = PersonRepository.Data.filter((value, index, arr) => {
      return (
        value.lastname.toLowerCase().trim().includes(text) ||
        value.firstname.toLowerCase().trim().includes(text) ||
        value.company.toLowerCase().trim().includes(text) ||
        value.cellphone.toLowerCase().trim().includes(text)
      );
    });

    return results;
  }

  /**
   * Delete by Id
   * @param {String} id
   * @returns {200 | 404} - HttpStatusCode
   */
  static delete(id) {
    if (!validator.isInt(id, { min: 1, max: Max_Int32 })) {
      id = '0';
    }

    var deleted = false;
    PersonRepository.Data = PersonRepository.Data.filter(
      (value, index, arr) => {
        if (id == value.id) {
          deleted = true;
          return false;
        } else {
          return true;
        }
      },
    );

    if (deleted) {
      return 200;
    } else {
      return 404;
    }
  }

  /**
   * Add/Update Person
   * @param {object} o
   * @returns {406|201|200|400} -  http status code
   */
  static addUpdate(o) {
    var sc = 406;

    if (o == null || o.length <= 0) {
      return sc;
    }

    var person = Person.fromObject(o);
    if (person.isValid()) {
      sc = 201;
      const results = PersonRepository.Data.filter((p) => p.id == person.id);

      if (results.length > 0) {
        /* _= */ PersonRepository.delete(person.id);
        sc = 200;
      }
      PersonRepository.Data.push(person);
      return sc;
    } else {
      sc = 400;
      return sc;
    }
  }

  /**
   * Populate How-Many Samples into Data
   * @param {Number} howMany
   * @returns {Array} of People created
   */
  static addSamples(howMany) {
    if (!howMany) {
      howMany = 0;
    }
    if (!validator.isInt(howMany.toString(), { min: 1, max: 99 })) {
      howMany = Default_HowMany;
    }

    var results = [];
    for (let i = 0; i < howMany; i++) {
      var p = Person.makePerson();
      PersonRepository.Data.push(p);
      results.push(p);
    }

    return results;
  }
};
