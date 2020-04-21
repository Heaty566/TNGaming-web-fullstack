//import router
const tags = require("./tag");
const users = require("./user");
const userGames = require("./userGame");
const games = require("./game");
const auth = require("./auth");
const admin = require("./admin");
const developer = require("./developer");
const platforms = require("./platform");

//setting URL
const tagsURL = "/api/games/tags";
const platformsURL = "/api/games/platforms";
const authURL = "/api/users";
const usersURL = "/api/users";
const userGamesURL = "/api/users/games";
const gamesURL = "/api/games";
const adminURL = "/api/users/admin";
const developerURL = "/api/users/developer";

module.exports = {
    tags,
    tagsURL,
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
    gamesURL,
    platforms,
    platformsURL,
};
