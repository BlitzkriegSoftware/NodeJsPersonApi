"use strict";

const fs = require("node:fs");
const express = require("express");
const router = express.Router();

var Status = require("../models/status");

router.use(express.json());

/*
  ------------------
  About
  ------------------
*/
router.get("/about", (req, res) => {
  // #swagger.summary = 'About this project'

  const filename = "./package.json";

  var id = {
    version: "n/a",
    description: "People API",
    author: "Stuart Williams",
    license: "n/a",
    git: "https://github.com/BlitzkriegSoftware/NodeJsPersonApi",
    copyright: "(c) 2024",
  };

  fs.readFile(filename, "utf8", (err, data) => {
    if (err == null) {
      id = data;
    }
  });

  var info = {
    author: id.author,
    version: id.version,
    description: id.description,
    license: id.license,
    git: id.git,
    copyright: id.copyright,
  };
});
/*
  ------------------
  (exports)
  ------------------
*/
// always last line
module.exports = router;
