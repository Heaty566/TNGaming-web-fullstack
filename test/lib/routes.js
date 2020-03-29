const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { genres, genresURL } = require("../routes");

module.exports = function(app) {
  app.use(cors());
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(express.static(process.cwd() + "/public"));
  //main routers
  app.use(genresURL, genres);

  app.get("/*", (req, res) => {
    res.sendFile(process.cwd() + "/public/index.html");
  });
};
