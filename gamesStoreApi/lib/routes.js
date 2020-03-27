const express = require("express");
const cors = require("cors");

module.exports = function(app) {
  app.use(cors());
  app.use(express.json());
  app.use(express.static(process.cwd() + "/public"));
  app.get("/*", (req, res) => {
    res.sendFile(process.cwd() + "/public/index.html");
  });
};
