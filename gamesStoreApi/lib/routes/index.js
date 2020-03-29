//import router
const genres = require("./genres");
const users = require("./users");
const auth = require("./auth");

//setting URL
const genresURL = "/api/games/genres";
const usersURL = "/api/users";
const authURL = "/api/users";

module.exports = { genres, genresURL, users, usersURL, auth, authURL };
