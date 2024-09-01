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
 * @alias module:routes/personrouter.samples
 * @argument {Number} count of Person to Make and add to Data
 * @returns {Number} {Array} of created people
 */
const samples = router.post('/person/samples/:count', (req, res) => {
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
 * GET /person/list
 * @alias module:routes/personrouter.list
 * @returns {Number} {Array} of People
 */
const list = router.get('/person/list', (req, res) => {
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
 * GET /person/search
 * @alias module:routes/personrouter.search
 * @returns {Number} {Array} of People
 */
const search = router.get('/person/search/:text', (req, res) => {
  // #swagger.summary = 'Search for people by keyword'
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

  #swagger.responses[404] = {
    description: "Not Found",
  }   

  #swagger.responses[400] = {
    description: "Text is required",
  } 

  */

  const text = req.params.text;
  if (Utility.isBlank(text)) {
    res.status(400);
  } else {
    const p = PersonRepository.search(text);
    if (p == null) {
      return res.status(404).json({ status: 'Not Found' });
    } else {
      res.status(200).json(p);
    }
  }
});

/**
 * GET /person/:id
 * @alias module:routes/personrouter.getbyid
 * @argument {String} Id of Person
 * @returns {Number} {Class} of Person or Null
 */
const getbyid = router.get('/person/:id', (req, res) => {
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

  const id = req.params.id;
  const p = PersonRepository.findById(id);
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
const addupdate = router.post('/person/', (req, res) => {
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

  const o = req.body;
  const sc = PersonRepository.addUpdate(o);
  res.status(sc).json({ status: sc });
});

/**
 * DELETE /person/:id
 * @alias module:routes/personrouter.deleter
 * @argument {String} id of person
 * @returns {Number} {String} status
 */
const deleter = router.delete('/person/:id', (req, res) => {
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
