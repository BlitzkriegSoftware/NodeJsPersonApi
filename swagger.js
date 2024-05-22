"use strict";

// https://dev.to/luizcalaca/autogenerated-documentation-api-with-openapi-and-swagger-for-nodejs-and-express-31g9

const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";

// Add all routers here
const endpointsFiles = ["./routers/personRouter.js"];

swaggerAutogen(outputFile, endpointsFiles);
