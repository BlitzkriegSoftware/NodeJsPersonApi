'use strict';

/**
 * Script to regenerate swagger from the Routes, etc.
 * @name   Swagger
 * @module SwaggerGenerator
 */

const fs = require('node:fs');
const { Port } = require('./Settings/envVars.js');

console.log('Creating Swagger for Routers on Port: ' + Port);

// https://dev.to/luizcalaca/autogenerated-documentation-api-with-openapi-and-swagger-for-nodejs-and-express-31g9
// https://swagger-autogen.github.io/docs/openapi-3/

const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const outputFile = './swagger.json';

/**
 * Schemas: Person (Class), People (Array)
 */
var comps = {
  components: {
    schemas: {
      Person: {
        $id: 'unique identity',
        $firstname: 'first name',
        $lastname: 'last name',
        cellphone: 'cell phone',
        company: 'company',
        email: 'email',
      },
      People: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/Person',
        },
      },
    },
  },
};

/**
 * Add all routers here
 */
const endpointsFiles = ['./routers/personRouter.js', './routers/infoRouter.js'];

/**
 * Generate new swagger file then edit with Port, URL, etc.
 */
swaggerAutogen(outputFile, endpointsFiles, comps).then((data) => {
  console.log('Updating ' + outputFile);

  let openapi3 = require(outputFile);

  // Manual overrides
  openapi3.info.description = 'Person API';
  openapi3.servers[0].url = 'http://localhost:' + Port;

  // write updates
  var json = JSON.stringify(openapi3, null, 2);
  fs.writeFile(outputFile, json, (err) => {
    if (err) console.log(JSON.stringify(err));
  });
});
