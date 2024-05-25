"use strict";

const Person = require('../models/person');

// Repository of Person
module.exports = class PersonRepository {

    // Data: array of people
    static Data = [];

    // Has Data
    static hasData() {
      return (Data.length > 0);
    }

    // Empty data, return 200
    static reset() {
        Data = [];
        return 200;
    }

    // find by id, returns Person or null
    static findById(id) {
        const results = Data.filter((person) => person.id == id);
        if(results.length > 0) {
            return results[0];
        } else {
            return null;
        }
    }

    // find by name or fields, returns array of results
    static search(text) 
    {
        if((text ==null) || (text.length <= 0)) {
            return [];
        }

        text = text.toLowerCase().trim();

        var results = Data.filter((value, index, arr) => {
            return 
                value.lastname.toLowerCase().trim().includes(text) ||
                value.firstname.toLowerCase().trim().includes(text) ||
                value.company.toLowerCase().trim().includes(text) ||                
                value.cellphone.toLowerCase().trim().includes(text);
        });

        return results;
    }

    // Delete by id, return 200 or 404
    static delete(id) {
        var deleted = false;
        Data = Data.filter((value, index, arr) => {
            if (id == value.id) {
            deleted = true;
            return false;
            } else return true;
        });  
        
        if(deleted) {
            return 200;
        } else {
            return 404;
        }
    }

    // Add/updates given object, returns Http-Status-Code
    static addUpdate(o) {

        if((o ==null) || (o.length <= 0)) {
            return 406;
        }

        var person = new Person();
        try {
            person = Person.fromObject(o);
        } catch {
            return 406;
        }

        if (person.isValid()) {
            var rc = 201;
            const results = Data.filter((p) => p.id == person.id);

            if (results.length > 0) {
                _ = Delete(person.id);
                rc = 200;
            } 
            
            Data.push(person);

            return rc;
        } else {
           return 400;
        }
    }

    // Populate data with {howMany} samples, return samples
    static addSamples(howMany) {
        var count = Number(howMany || 5);
        var results = [];
        for (let i = 0; i < count; i++) {
            var p = Person.makePerson();
            Data.push(p);
            results.push(p);
        }
        
        return results;
    }

}
