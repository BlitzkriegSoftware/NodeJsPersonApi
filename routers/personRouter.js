"use strict";

const express = require("express");
const router = express.Router();

var Data = require("../data/people");
const Person = require("../models/person");
const PersonRepository = require("../data/people");

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

  res.status(200).json(Data);
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
  _ = PersonRepository.addSamples(sampleCount);
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
  }   
  */

  /* 
  #swagger.responses[404] = {
    description: "Not Found",
  }   
  */

  var p = PersonRepository.findById(id);
  if(p == null) {
    return res.status(404);
  } else {
    res.status(200).json(p);
  }

});

/*
  ------------------
  ADD/update PERSON
  ------------------
*/
router.post("/person/", (req, res) => {
  // #swagger.summary = 'Add/Update PERSON'
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

  var o = req.body;
  var sc = PersonRepository.addUpdate(o);
  res.status(sc);
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

  const id = req.params.id;
  var sc =PersonRepository.delete(id);
  res.status(sc);
});

/*
  ------------------
  (exports)
  ------------------
*/
// always last line
module.exports = router;
