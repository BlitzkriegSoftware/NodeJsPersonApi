'use strict';

/**
 * Environment Variables
 * @name   EnvironmentVariables
 * @module Settings
 */
const port = process.env.API_PORT ?? 30090;

module.exports = {
  Port: port,
};
