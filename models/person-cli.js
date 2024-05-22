"use strict";

const Person = require("./person");

var person = Person.makeperson();
console.log(person.isValid());
var json = JSON.stringify(person);
console.log(json);
var p2 = Person.fromjson(json);
console.log(p2.tostring());
console.log(p2.isValid());
console.log(person.lastname == p2.lastname);
console.log(person.firstname == p2.firstname);
console.log(person.cellphone == p2.cellphone);
console.log(person.email == p2.email);
console.log(person.company == p2.company);
