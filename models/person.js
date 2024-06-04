'use strict';

// https://fakerjs.dev/guide/usage.html
const { faker } = require('@faker-js/faker');
var Utility = require('../library/utility').Utility;

/**
 * @module models/person
 * @name Person
 * @class
 * @classdesc Model of a Person in our System
 */
module.exports = class Person {
  /**
   * CTOR, these are the fields
   * @alias module:models/person.constructor
   * @constructor
   * @param {String} id - Unique Id
   * @param {String} firstname - First Name
   * @param {String} lastname - Last Name
   * @param {String} cellphone - Cell Phone Number
   * @param {String} email - Email
   * @param {String} company - Company Name
   * @returns {Person} - person class
   */
  constructor(id, firstname, lastname, cellphone, email, company) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.cellphone = cellphone;
    this.email = email;
    this.company = company;
  }

  /**
   * Generates a random Person
   * @static
   * @alias Person.makePerson
   * @memberof Person
   * @returns {Class} Person
   */
  static makePerson() {
    var _id = String(Math.round(Math.random() * 100000));
    var _firstname = faker.person.firstName();
    var _lastname = faker.person.lastName();
    var _cellphone = faker.phone.number();
    var _company = faker.company.name();
    var _email =
      _firstname +
      '.' +
      _lastname +
      '@' +
      _company
        .replace(/[,.'&^<>?/]+/g, '')
        .replace(/\s+/g, '')
        .trim() +
      '.com';

    return new Person(_id, _firstname, _lastname, _cellphone, _email, _company);
  }

  /**
   * Semi-Colon separated list of fields for debugging
   * @static
   * @memberof Person
   * @alias Person.toString - ({Person})
   * @param {Class} person
   * @returns {String}
   */
  static toString(person) {
    var s = `${person.id};${person.firstname};${person.lastname};${person.cellphone};${person.email};${person.company}`;
    return s;
  }

  /**
   * @instance
   * @memberof Person
   * @alias Person.toString - Self
   * For this instance return a Semi-Colon separated list of fields for debugging
   * @returns {String}
   */
  toString() {
    return Person.toString(this);
  }

  /**
   * Parse Person from Json
   * @static
   * @memberof Person
   * @alias Person.fromJson - populate a new person from given JSON
   * @param {String} json
   * @returns {Class} Person or {null}
   */
  static fromJson(json) {
    var p = null;
    try {
      var o = JSON.parse(json);
      // console.log(Object.getOwnPropertyNames(o));
      p = new Person(
        o.id,
        o.firstname,
        o.lastname,
        o.cellphone,
        o.email,
        o.company,
      );
    } catch {
      p = null;
    }
    return p;
  }

  /**
   * Parse Person from Object
   * @static
   * @memberof Person
   * @alias Person.fromObject - Populate a new person from given object
   * @param {Object} o
   * @returns {Class} Person
   */
  static fromObject(o) {
    var p = null;
    if (o == null) {
      p = null;
    } else {
      p = new Person(
        o.id,
        o.firstname,
        o.lastname,
        o.cellphone,
        o.email,
        o.company,
      );
    }
    return p;
  }

  /**
   * @instance
   * @memberof Person
   * @alias Person.isValid - True if required fields are present
   * @returns {Boolean}
   * Returns true if this person has the minumum fields: id, first, last
   */
  isValid() {
    return (
      !Utility.isBlank(this.id) &&
      !isNaN(this.id) &&
      !Utility.isBlank(this.firstname) &&
      !Utility.isBlank(this.lastname)
    );
  }
};
