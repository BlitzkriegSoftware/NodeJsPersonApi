"use strict";

const Person = require("../models/person");
const express = require("express");
const router = express.Router();
var cors = require("cors");

var Data = require("../data/people");

router.use(express.json());

// #swagger.description = 'People API'

router.get("/person/list", (req, res) => {
  // #swagger.summary = 'Gets all people'

  /* 
  #swagger.responses[200] = {
    description: "Returns PEOPLE or error",
    content: {
      "application/json": {
        schema:{
          $ref: "#/components/schemas/People"
        }
      }           
    }
  }   
*/

  res.json(Data);
});

router.get("/person/samples", (req, res) => {
  // #swagger.summary = 'Makes 5 sample people and adds them to DATA'

  /* 
  #swagger.responses[200] = {
    description: "Returns PERSON or error",
    content: {
      "application/json": {
        schema:{
          $ref: "#/components/schemas/People"
        }
      }           
    }
  }   
*/

  const sampleCount = 5;

  for (let i = 0; i < sampleCount; i++) {
    var p = Person.makeperson();
    Data.push(p);
  }

  res.json(Data);
});

router.get("/person/:id", (req, res) => {
  // #swagger.summary = 'Gets person by ID'

  /* 
  #swagger.responses[200] = {
    description: "Returns PERSON or error",
    content: {
      "application/json": {
          schema:{
            $ref: "#/components/schemas/Person"
          }
      }           
    }
}   
  */

  const results = Data.filter((person) => person.id == req.params.id);
  res.json(results);
});

router.post("/person/", (req, res) => {
  // #swagger.summary = 'Add a new PERSON'
  // #swagger.description = 'Returns status message'

  /*  
    #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Person"
            }  
          }
        }
    }
  */

  var person = Person.fromjson(req.body);
  Data.push(person);
  res.json({ success: true, message: "added successfully" });
});

router.put("/person/", (req, res) => {
  // #swagger.summary = 'Updates an existing PERSON'
  // #swagger.description = 'Returns status message'

  /*  
    #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Person"
            }  
          }
        }
    }
  */

  const json = req.body;
  var p = Person.fromjson(json);
  var id = p.id;

  Data = Data.filter((value, index, arr) => {
    if (id != value.id) return false;
    else return true;
  });

  data.push(p);
  res.json({ success: true, message: "updated" });
});

router.delete("/person/:id", (req, res) => {
  // #swagger.summary = 'Deletes an existing PERSON by ID'
  // #swagger.description = 'Returns status message'
  const id = req.params.id;
  Data = Data.filter((value, index, arr) => {
    if (id != value.id) return false;
    else return true;
  });
  res.json({ success: true, message: "deleted" });
});

// always last line
module.exports = router;
