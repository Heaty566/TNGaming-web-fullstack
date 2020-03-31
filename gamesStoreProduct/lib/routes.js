const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { genres, genresURL, users, usersURL, auth, authURL, admin, adminURL, developer, developerURL } = require("./routes/");

module.exports = function(app) {
    app.use(cors());
    app.use(express.json());
    app.use(bodyParser.json());
    app.use(express.static(process.cwd() + "/public"));

    //main routers
    app.use(usersURL, users);
    app.use(authURL, auth);
    app.use(genresURL, genres);
    app.use(adminURL, admin);
    app.use(developerURL, developer);

    app.get("/*", (req, res) => {
        res.sendFile(process.cwd() + "/public/index.html");
    });
};
