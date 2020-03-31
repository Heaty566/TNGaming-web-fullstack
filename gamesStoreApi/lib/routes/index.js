//import router
const genres = require("./genres");
const users = require("./users");
const auth = require("./auth");
const admin = require("./admin");
const developer = require("./developer");

//setting URL
const genresURL = "/api/games/genres";
const usersURL = "/api/users";
const authURL = "/api/users";
const adminURL = "/api/users/admin";
const developerURL = "/api/users/developer";

module.exports = { genres, genresURL, users, usersURL, auth, authURL, admin, adminURL, developer, developerURL };
