"use strict";

const express = require("express");
const app = express();
const port = process.env.API_PORT ?? 30090;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
