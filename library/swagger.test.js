'use strict';

// https://jestjs.io/docs/getting-started
const { describe, expect, test } = require('@jest/globals');
const path = require('path');
const fs = require('node:fs');
const Utility = require('../library/utility');

const OpenApi3Generation = require('./swagger.js');
const { assert } = require('console');
const Default_Port = 30083; // My favorite port
const Default_Urls = 'http://localhost,https://localhost,';
const urls = Default_Urls.split(',');

test('confirmGeneration', async () => {
  global.appRoot = path.join(__dirname, '..');
  process.chdir(global.appRoot);
  const generator = new OpenApi3Generation();
  const filename = await Utility.tempFile('swagger.json');
  console.log(`Filename: ${filename}`);
  const result = await generator.generate(filename, urls, Default_Port);
  expect(fs.existsSync(result)).toBe(true);
});
