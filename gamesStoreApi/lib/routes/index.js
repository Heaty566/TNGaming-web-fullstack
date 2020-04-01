//import router
const genres = require("./genres");
const users = require("./users");
const userGames = require("./userGames");
const games = require("./games");
const auth = require("./auth");
const admin = require("./admin");
const developer = require("./developer");

//setting URL
const genresURL = "/api/users/admin/games/genres";
const authURL = "/api/users";
const usersURL = "/api/users";
const userGamesURL = "/api/users/games";
const gamesURL = "/api/games";
const adminURL = "/api/users/admin";
const developerURL = "/api/users/developer";

module.exports = {
    genres,
    genresURL,
    users,
    usersURL,
    auth,
    authURL,
    admin,
    adminURL,
    developer,
    developerURL,
    userGames,
    userGamesURL,
    games,
    gamesURL
};
