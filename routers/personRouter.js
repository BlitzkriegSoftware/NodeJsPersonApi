"use strict";

const Person = require("../models/person");
const express = require("express");
const router = express.Router();
var cors = require("cors");

var Data = require("../data/people");
var Status = require("../models/status");

router.use(express.json());

// #swagger.description = 'People API'

/*
  ------------------
  LIST
  ------------------
*/
router.get("/person/list", (req, res) => {
  // #swagger.summary = 'Gets all people'

  /* 
  #swagger.responses[200] = {
    description: "Returns People",
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

/*
  ------------------
  MAKE SAMPLES
  ------------------
*/
router.post("/person/samples/:count", (req, res) => {
  // #swagger.summary = 'Makes N sample people and adds them to DATA (default: 5)'

  /* 
  #swagger.responses[200] = {
    description: "Creates {count} people",
    content: {
      "application/json": {
        schema:{
          $ref: "#/components/schemas/People"
        }
      }           
    }
  }   
*/

  const sampleCount = Number(req.params.count || 5);

  for (let i = 0; i < sampleCount; i++) {
    var p = Person.makePerson();
    Data.push(p);
  }

  res.json(Data);
});

/*
  ------------------
  GET BY ID
  ------------------
*/
router.get("/person/:id", (req, res) => {
  // #swagger.summary = 'Gets person by ID or 404 w. Status'

  /* 
  #swagger.responses[200] = {
    description: "Returns PERSON",
    content: {
      "application/json": {
        schema:{
          $ref: "#/components/schemas/Person"
        }
      }           
    }
  }   
  */

  /* 
  #swagger.responses[404] = {
    description: "Not Found",
    content: {
      "application/json": {
        schema:{
          $ref: "#/components/schemas/Status"
        }
      }           
    }
  }   
  */

  const results = Data.filter((person) => person.id == req.params.id);
  if (results == null || results.length <= 0) {
    var status = new Status("Not found");
    res.status(404).json(status);
  } else {
    res.status(200).json(results);
  }
});

/*
  ------------------
  ADD PERSON
  ------------------
*/
router.post("/person/", (req, res) => {
  // #swagger.summary = 'Add a new PERSON'
  // #swagger.description = 'Returns Status message'

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

  /* 
  #swagger.responses[201] = {
    description: "Created w. Status",
    content: {
      "application/json": {
        schema:{
          $ref: "#/components/schemas/Status"
        }
      }           
    }
  }   
  */

  /* 
  #swagger.responses[400] = {
    description: "Bad Person w. Status",
    content: {
      "application/json": {
        schema:{
          $ref: "#/components/schemas/Status"
        }
      }           
    }
  }   
  */

  var person = Person.fromObject(req.body);

  if (person.isValid()) {
    var status = new Status("Created");
    Data.push(person);
    res.status(201).json(status);
  } else {
    var status = new Status("Invalid Person");
    res.status(400).json(status);
  }
});

/*
  ------------------
  UPDATE PERSON
  ------------------
*/
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

  /* 
  #swagger.responses[200] = {
    description: "Updated w. Status",
    content: {
      "application/json": {
        schema:{
          $ref: "#/components/schemas/Status"
        }
      }           
    }
  }   
  */

  /* 
  #swagger.responses[400] = {
    description: "Bad Person w. Status",
    content: {
      "application/json": {
        schema:{
          $ref: "#/components/schemas/Status"
        }
      }           
    }
  }   
  */

  const json = req.body;
  var p = Person.fromObject(json);

  if (p.isValid()) {
    // remove old record
    var id = p.id;
    Data = Data.filter((value, index, arr) => {
      if (id != value.id) return false;
      else return true;
    });

    // add resplacement
    data.push(p);
    var status = new Status("Updated");
    res.status(200).json(status);
  } else {
    var status = new Status("Bad Person");
    res.status(400).json(status);
  }
});

/*
  ------------------
  DELETE
  ------------------
*/
router.delete("/person/:id", (req, res) => {
  // #swagger.summary = 'Deletes an existing PERSON by ID'
  // #swagger.description = 'Returns status message'

  /* 
  #swagger.responses[200] = {
    description: "Deleted status",
    content: {
      "application/json": {
        schema:{
          $ref: "#/components/schemas/Status"
        }
      }           
    }
  }   
  */

  /* 
  #swagger.responses[404] = {
    description: "Not Found",
    content: {
      "application/json": {
        schema:{
          $ref: "#/components/schemas/Status"
        }
      }           
    }
  }   
  */

  var deleted = false;
  const id = req.params.id;
  Data = Data.filter((value, index, arr) => {
    if (id == value.id) {
      deleted = true;
      return false;
    } else return true;
  });

  if (deleted) {
    var status = new Status("Deleted");
    res.status(200).json(status);
  } else {
    var status = new Status("Not Found");
    res.status(404).json(status);
  }
});

/*
  ------------------
  (exports)
  ------------------
*/
// always last line
module.exports = router;
