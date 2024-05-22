"use strict";

const Person = require("../models/person");
const Data = require("../data/people");
const express = require("express");
const router = express.Router();
var cors = require("cors");

router.use(express.json());

router.get("/person/", (req, res) => {
  res.json(Data);
});

router.get("/person/samples", (req, res) => {
  const sampleCount = 5;

  for (let i = 0; i < sampleCount; i++) {
    var p = Person.makeperson();
    Data.push(p);
  }

  res.json(Data);
});

router.get("/person/:id", (req, res) => {
  const results = Data.filter((person) => person.id == req.params.id);
  res.json(results);
});

router.post("/person/", (req, res) => {
  var person = Person.fromjson(req.body);
  Data.push(person);
  res.json({ success: true, message: "added successfully" });
});

router.put("/person/", (req, res) => {
  const json = req.body;
  var p = Person.fromjson(json);
  var id = p.id;

  Data = Data.filter((value, index, arr) => {
    if (id != value.id) return false;
    else return true;
  });

  data.push(p);
  res.json({ success: true, message: "updated" });
});

router.delete("/person/:id", (req, res) => {
  const id = req.params.id;
  Data = Data.filter((value, index, arr) => {
    if (id != value.id) return false;
    else return true;
  });
  res.json({ success: true, message: "deleted" });
});

// always last line
module.exports = router;
