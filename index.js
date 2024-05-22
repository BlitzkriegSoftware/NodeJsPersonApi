"use strict";

const port = process.env.API_PORT ?? 30090;

const express = require("express");
const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

const router = require("./routers/personRouter");

app.use(express.json());
app.use("/person", router.personRouter);
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get("/", (req, res) => {
  res.redirect("/doc");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
