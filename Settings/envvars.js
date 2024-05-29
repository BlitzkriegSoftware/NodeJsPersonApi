'use strict';

/**
 * Environment Variables
 * @name   EnvironmentVariables
 * @module settings/environmentvars
 */

/**
 * @returns {Number} - Environment Variable 'API_PORT'
 */
const port = process.env.API_PORT ?? 30090;

module.exports = {
  Port: port,
};
