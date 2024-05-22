"use strict";

const port = process.env.API_PORT ?? 30090;

const express = require("express");
const app = express();
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

const personRouter = require("./routers/personRouter");

// https://dev.to/speaklouder/how-to-configure-cors-in-nodejs-with-express-11h
let corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(JSON.stringify(err));
});

app.use(express.json());

app.use("/", personRouter);
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get("/", (req, res) => {
  res.redirect("/doc");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
