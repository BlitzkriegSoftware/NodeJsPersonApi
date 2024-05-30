'use strict';

/**
 * Script to regenerate swagger from the Routes, etc.
 * @see {@link https://dev.to/luizcalaca/autogenerated-documentation-api-with-openapi-and-swagger-for-nodejs-and-express-31g9 | tutorial }
 * @see {@link https://swagger-autogen.github.io/docs/openapi-3/ | swagger auto generator}
 * @module generator/swagger
 */

const fs = require('node:fs');
const { Port } = require('./Settings/envVars.js');
const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });
const outputFile = './swagger.json';

console.log('Creating Swagger for Routers on Port: ' + Port);

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

  const openapi3 = require(outputFile);
  const pkg = require('./package.json');

  // Manual overrides
  openapi3.info.title = 'People REST API';
  openapi3.info.description = 'An attempt to make a best practices pattern';
  openapi3.info.version = pkg.version;
  openapi3.info.contact = {};
  openapi3.info.contact.name = pkg.author;
  openapi3.info.contact.email = 'stuart.williams@outlook.com';
  openapi3.info.contact.url =
    'https://github.com/BlitzkriegSoftware/NodeJsPersonApi';
  openapi3.info.license = {};
  openapi3.info.license.name = 'MIT';
  openapi3.info.license.url =
    'https://github.com/BlitzkriegSoftware/NodeJsPersonApi/blob/main/LICENSE';

  openapi3.servers[0].url = 'http://localhost:' + Port;

  // write updates
  var json = JSON.stringify(openapi3, null, 2);
  fs.writeFile(outputFile, json, (err) => {
    if (err) console.log(JSON.stringify(err));
  });
});
