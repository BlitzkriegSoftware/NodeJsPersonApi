"use strict";

// https://fakerjs.dev/guide/usage.html
const { faker } = require("@faker-js/faker");

module.exports = class Person {
  constructor(id, firstname, lastname, cellphone, email, company) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.cellphone = cellphone;
    this.email = email;
    this.company = company;
  }

  static {
    this.id = "";
    this.firstname = "";
    this.lastname = "";
    this.cellphone = "";
    this.email = "";
    this.company = "";
  }

  static makeperson() {
    var _id = String(Math.round(Math.random() * 100000));
    var _firstname = faker.person.firstName;
    var _lastname = faker.person.lastName;
    var _cellphone = faker.phone.number();
    var _company = faker.company.name;
    var _email = _firstname + "." + _lastname + "@" + _company + ".com";

    return new Person(_id, _firstname, _lastname, _cellphone, _email, _company);
  }

  isvalid() {
    return (
      !this.isBlank(this.firstname) &&
      !this.isBlank(this.lastname) &&
      !this.isBlank(this.id)
    );
  }

  // Is falsy or just whitespace
  isBlank(str) {
    return !str || /^\s*$/.test(str);
  }
};
