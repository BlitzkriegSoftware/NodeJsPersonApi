'use strict';

/**
 * Script to regenerate swagger from the Routes, etc.
 * @example
 * Shows how to how to customize the swagger after auto-generation
 * @see {@link https://dev.to/luizcalaca/autogenerated-documentation-api-with-openapi-and-swagger-for-nodejs-and-express-31g9 | tutorial }
 * @see {@link https://swagger-autogen.github.io/docs/openapi-3/ | swagger auto generator}
 * @module generator/swagger
 */

const fs = require('node:fs');
const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });
const outputFile = './swagger.json';

module.exports = class OpenApi3Generation {
  /**
   * Generate Swagger in OpenAPI3 JSON
   * @param {array} urls
   * @param {string} port
   * @returns {striing} openapi3filename
   */
  static generate(urls, port) {
    if (!port || port <= 1) {
      console.error('bad port #');
      return '';
    }

    console.log(
      'Creating Swagger for Routers on Port: ' +
        Port +
        ' for ' +
        urls.join('; '),
    );

    /**
     * Schemas: Person (Class), People (Array)
     */
    var comps = {
      components: {
        schemas: {
          Person: {
            $id: 'unique integer identity',
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
    const endpointsFiles = [
      './routers/personRouter.js',
      './routers/infoRouter.js',
    ];

    /**
     * Generate new swagger file then edit with Port, URL, etc.
     */
    swaggerAutogen(outputFile, endpointsFiles, comps).then((data) => {
      const openapi3 = require(outputFile);
      const pkg = require('../package.json');
      const version = pkg.version;

      console.log('Updating ' + outputFile + ' for version ' + version);

      // Manual overrides
      openapi3.info.title = pkg.name;
      openapi3.info.description = pkg.description;
      openapi3.info.version = version;
      openapi3.info.contact = {};
      openapi3.info.contact.name = pkg.author;
      openapi3.info.contact.email = 'stuart.williams@outlook.com';
      openapi3.info.contact.url =
        'https://github.com/BlitzkriegSoftware/NodeJsPersonApi';
      openapi3.info.license = {};
      openapi3.info.license.name = 'MIT';
      openapi3.info.license.url =
        'https://github.com/BlitzkriegSoftware/NodeJsPersonApi/blob/main/LICENSE';

      var uct = 0;
      for (const url of Urls) {
        if (url) {
          var fqdn = url + ':' + Port;
          if (uct == 0) {
            openapi3.servers[0].url = fqdn;
          } else {
            openapi3.servers.push({ url: fqdn });
          }
        }
        uct = uct + 1;
      }

      // write updates
      var json = JSON.stringify(openapi3, null, 2);
      fs.writeFile(outputFile, json, (err) => {
        if (err) console.log(JSON.stringify(err));
      });
    });
    return outputFile;
  }
};