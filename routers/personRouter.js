'use strict';

/**
 * All person endpoints
 * @public
 * @module routes/personrouter
 */

const express = require('express');
const router = express.Router();

const PersonRepository = require('../data/people');

router.use(express.json());

// #swagger.description = 'People API'

/*
  ------------------
  LIST
  ------------------
*/

/**
 * GET /person/list
 * @alias module:routes/personrouter.list
 * @returns {Number} {Array} of People
 */
var list = router.get('/person/list', (req, res) => {
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

  res.status(200).json(PersonRepository.Data);
});

/**
 * POST /person/samples/:count
 * @alias module:routes/personrouter.samples
 * @argument {Number} count of Person to Make and add to Data
 * @returns {Number} {Array} of created people
 */
var samples = router.post('/person/samples/:count', (req, res) => {
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
  /* _= */ PersonRepository.addSamples(sampleCount);
  res.json(PersonRepository.Data);
});

/**
 * GET /person/:id
 * @alias module:routes/personrouter.getbyid
 * @argument {String} Id of Person
 * @returns {Number} {Class} of Person or Null
 */
var getbyid = router.get('/person/:id', (req, res) => {
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

  var id = req.params.id;
  var p = PersonRepository.findById(id);
  if (p == null) {
    return res.status(404).json({ status: 'Not Found' });
  } else {
    res.status(200).json(p);
  }
});

/**
 * POST /person/ ADD/update PERSON
 * @alias module:routes/personrouter.addupdate
 * @argument {Class} Person (as Json)
 * @returns {Number} {String} Status
 */
var addupdate = router.post('/person/', (req, res) => {
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
    description: "Updated w. Status"
  }   
  */

  /* 
  #swagger.responses[201] = {
    description: "Created w. Status"
  }   
  */

  /* 
  #swagger.responses[400] = {
    description: "Bad Person w. Status"
  }   
  */

  var o = req.body;
  var sc = PersonRepository.addUpdate(o);
  res.status(sc).json({ status: sc });
});

/**
 * DELETE /person/:id
 * @alias module:routes/personrouter.deleter
 * @argument {String} id of person
 * @returns {Number} {String} status
 */
var deleter = router.delete('/person/:id', (req, res) => {
  // #swagger.summary = 'Deletes an existing PERSON by ID'
  // #swagger.description = 'Returns status message'

  /* 
  #swagger.responses[200] = {
    description: "Deleted status"
  }   
  */

  /* 
  #swagger.responses[404] = {
    description: "Not Found"
  }   
  */

  const id = req.params.id;
  var sc = PersonRepository.delete(id);
  var status = 'deleted';
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
