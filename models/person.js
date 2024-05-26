'use strict';

// https://fakerjs.dev/guide/usage.html
const { faker } = require('@faker-js/faker');

/**
 * Class: Person
 */
module.exports = class Person {
  /**
   * CTOR, these are the fields
   * @param {String} id
   * @param {String} firstname
   * @param {String} lastname
   * @param {String} cellphone
   * @param {String} email
   * @param {String} company
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
   * Static CTOR, makes all fields the zero length string
   */
  static {
    this.id = '';
    this.firstname = '';
    this.lastname = '';
    this.cellphone = '';
    this.email = '';
    this.company = '';
  }

  /**
   * Generates a random Person
   * @returns Person
   */
  static makePerson() {
    var _id = String(Math.round(Math.random() * 100000));
    var _firstname = faker.person.firstName();
    var _lastname = faker.person.lastName();
    var _cellphone = faker.phone.number();
    var _company = faker.company.name();
    var _email = _firstname + '.' + _lastname + '@' + _company + '.com';

    return new Person(_id, _firstname, _lastname, _cellphone, _email, _company);
  }

  /**
   * Semi-Colon separated list of fields for debugging
   * @param {Class} person
   * @returns {String}
   */
  static toString(person) {
    var s = `${person.id};${person.firstname};${person.lastname};${person.cellphone};${person.email};${person.company}`;
    return s;
  }

  /**
   * Semi-Colon separated list of fields for debugging
   * @returns {String}
   */
  toString() {
    return Person.toString(this);
  }

  /**
   * Parse Person from Json
   * @param {String} json
   * @returns {Class} Person
   */
  static fromJson(json) {
    var o = JSON.parse(json);
    // console.log(Object.getOwnPropertyNames(o));
    var p = new Person(
      o.id,
      o.firstname,
      o.lastname,
      o.cellphone,
      o.email,
      o.company
    );

    return p;
  }

  /**
   * Parse Person from Object
   * @param {Object} o
   * @returns {Class} Person
   */
  static fromObject(o) {
    var p = new Person(
      o.id,
      o.firstname,
      o.lastname,
      o.cellphone,
      o.email,
      o.company
    );

    return p;
  }

  /**
   * Returns true if this person has the minumum fields
   * @returns {Boolean}
   */
  isValid() {
    return (
      !this.isBlank(this.firstname) &&
      !this.isBlank(this.lastname) &&
      !this.isBlank(this.id)
    );
  }

  /**
   * True if is falsy or just whitespace
   * @param {String} str
   * @returns {Boolean} isNullOrWhitespace
   */
  isBlank(str) {
    return !str || /^\s*$/.test(str);
  }
};
