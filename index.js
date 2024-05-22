"use strict";

// Environment Variables
const port = process.env.API_PORT ?? 30090;

// Express setup
const express = require("express");
const app = express();

// Swagger
// https://github.com/scottie1984/swagger-ui-express/issues/120
const swaggerUi = require("swagger-ui-express");

const DisableTryItOutPlugin = function () {
  return {
    statePlugins: {
      spec: {
        wrapSelectors: {
          allowTryItOutFor: () => () => false,
        },
      },
    },
  };
};

const options = {
  swaggerOptions: {
    plugins: [DisableTryItOutPlugin],
  },
};

const swaggerFile = require("./swagger_output.json");

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile, options));

// https://dev.to/speaklouder/how-to-configure-cors-in-nodejs-with-express-11h
const cors = require("cors");
let corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(JSON.stringify(err));
});

// Enable JSON
app.use(express.json());

// Person methods
const personRouter = require("./routers/personRouter");
app.use("/", personRouter);

// Redirect to swagger
app.get("/", (req, res) => {
  res.redirect("/doc");
});

// Start
app.listen(port, () => {
  console.log(`Person API listening on port ${port}`);
});
