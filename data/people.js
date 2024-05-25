'use strict';

const Person = require('../models/person');

// Repository of Person
module.exports = class PersonRepository {
  /**
   * Data Array
   */
  static Data = [];

  // Has Data
  /**
   * Does the Data array have any items?
   * @returns {boolean}
   */
  static hasData() {
    return PersonRepository.Data.length > 0;
  }

  /**
   * Empties Array
   * @returns {200}
   */
  static reset() {
    PersonRepository.Data = [];
    return 200;
  }

  /**
   * find by id
   * @param {} id
   * @returns {Person | null}
   */
  static findById(id) {
    const results = PersonRepository.Data.filter((person) => person.id == id);
    if (results.length > 0) {
      return results[0];
    } else {
      return null;
    }
  }

  /**
   * Search fields for text
   * @param {String} text
   * @returns {Array} can be empty
   */
  static search(text) {
    if (text == null || text.length <= 0) {
      return [];
    }

    text = text.toLowerCase().trim();

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
   * @returns {200 | 404}
   */
  static delete(id) {
    var deleted = false;
    PersonRepository.Data = PersonRepository.Data.filter(
      (value, index, arr) => {
        if (id == value.id) {
          deleted = true;
          return false;
        } else return true;
      }
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
   * @returns {Number} http status code
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
    var count = Number(howMany || 5);
    var results = [];
    for (let i = 0; i < count; i++) {
      var p = Person.makePerson();
      PersonRepository.Data.push(p);
      results.push(p);
    }

    return results;
  }
};
