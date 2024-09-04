'use strict';

/**
 * All person endpoints
 * @public
 * @module routes/personrouter
 */

const express = require('express');
const router = express.Router();

const PersonRepository = require('../data/people');
const Utility = require('../library/utility');

router.use(express.json());

// #swagger.description = 'People API'

/**
 * POST /person/samples/:count
 * @description Create {count} sample people
 * @alias module:routes/personrouter.samples
 * @function
 * @argument {Number} count of Person to Make and add to Data
 * @returns {Array} of created people
 * @example
 * 200 - OK
 * 404 - No {count} passed
 */
const samples = router.post('/person/samples/:count', (req, res) => {
  /*
  #swagger.summary = 'Makes N sample people and adds them to DATA (default: 5)'
   
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
  #swagger.responses[404] = {
    description: "No count passed"
  } 
 */
  const sampleCount = Number(req.params.count || 5);
  /* _= */ PersonRepository.addSamples(sampleCount);
  res.json(PersonRepository.Data);
});

/**
 * GET /person/list
 * @description Get the list of all people
 * @alias module:routes/personrouter.list
 * @function
 * @returns {Array} of People
 * @example
 * 200 - OK
 */
const list = router.get('/person/list', (req, res) => {
  /* 
    #swagger.summary = 'Gets all people'

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
  res.status(200).json(PersonRepository.Data);
});

/**
 * GET /person/search
 * @description Get People with Search Text
 * @alias module:routes/personrouter.search
 * @function
 * @returns {Array} of People
 * @example
 * 200 - List
 * 404 - Not found
 */
const search = router.get('/person/search/:text', (req, res) => {
  /* 
    #swagger.summary = 'Search for people by keyword'

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

    #swagger.responses[404] = {
      description: "Not Found or no text supplied",
    }   
  */
  const text = req.params.text;
  const p = PersonRepository.search(text);
  if (p.length <= 0) {
    return res.status(404).json({ status: 'Not Found' });
  } else {
    res.status(200).json(p);
  }
});

/**
 * GET /person/:id
 * @description Get a Person by Id
 * @alias module:routes/personrouter.getbyid
 * @function
 * @argument {String} Id of Person
 * @returns {Class} of Person or Null
 * @example
 * 200 - Person
 * 404 - Not Found
 */
const getbyid = router.get('/person/:id', (req, res) => {
  /* 
    #swagger.summary = 'Gets person by ID or 404 w. Status'

    #swagger.responses[200] = {
      description: "Returns PERSON",
    }   

    #swagger.responses[404] = {
      description: "Not Found",
    }   
  */
  const id = req.params.id;
  const p = PersonRepository.findById(id);
  if (p == null) {
    return res.status(404).json({ status: 'Not Found' });
  } else {
    res.status(200).json(p);
  }
});

/**
 * POST /person/
 * @description ADD/update PERSON
 * @alias module:routes/personrouter.addupdate
 * @function
 * @argument {Class} Person (as Json)
 * @returns {Class} Modified Person
 * @example
 * 200 - OK
 * 201 - Created
 * 400 - Bad Payload, see message
 */
const addupdate = router.post('/person/', (req, res) => {
  /*  
    #swagger.summary = 'Add/Update PERSON'
    #swagger.description = 'Returns Status message'
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
  #swagger.responses[200] = {
    description: "Updated w. Status"
  }   
  #swagger.responses[201] = {
    description: "Created w. Status"
  }   
  #swagger.responses[400] = {
    description: "Bad Person w. Status"
  }   
  */
  const o = req.body;
  const sc = PersonRepository.addUpdate(o);
  res.status(sc).json({ status: sc });
});

/**
 * DELETE /person/:id
 * @description Delete a person by Id
 * @alias module:routes/personrouter.deleter
 * @function
 * @argument {String} id of person
 * @returns {String} status
 * @example
 * 200 - OK
 * 404 - Not Found
 */
const deleter = router.delete('/person/:id', (req, res) => {
  /* 
    #swagger.summary = 'Deletes an existing PERSON by ID'
    #swagger.description = 'Returns status message'

    #swagger.responses[200] = {
      description: "Deleted status"
    }   

    #swagger.responses[404] = {
      description: "Not Found"
    }   
  */

  const id = req.params.id;
  const sc = PersonRepository.delete(id);
  let status = 'deleted';
  if (sc == 404) status = 'not deleted';
  res.status(sc).json({ status: status });
});

/*
  ------------------
  (exports)
  ------------------
*/
// always last line
module.exports = router;
