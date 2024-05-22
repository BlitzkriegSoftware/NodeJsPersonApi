"use strict";

const Person = require("../models/person");
const Data = require("../data/people");
const express = require("express");
const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
  res.json(Data);
});

router.get("/samples", (req, res) => {
  const sampleCount = 5;

  for (let i = 0; i < sampleCount; i++) {
    var p = Person.makeperson();
    Data.push(p);
  }

  res.json(Data);
});

router.get("/:id", (req, res) => {
  const results = Data.filter((person) => person.id == req.params.id);
  res.json(results);
});

router.post("/", (req, res) => {
  var person = Person.fromjson(req.body);
  Data.push(person);
  res.json({ success: true, message: "added successfully" });
});

router.put("/", (req, res) => {
  const { id, new_name } = req.body;
  Data[id - 1].name = new_name;
  res.json({ success: true, message: "updated" });
});

router.delete("/", (req, res) => {
  const { id } = req.body;
  Data.splice(id - 1, id);
  res.json({ success: true, message: "deleted" });
});

// always last line
module.exports = router;
