const express = require("express");
const router = express.Router();

const userGamesController = require("../controllers/userGame");

router.post("/addGameTo/:compartment/:gameId", userGamesController.add_game_to_compartment);

router.post("/removeGameFrom/:compartment/:gameId", userGamesController.remove_game_from_compartment);

router.post("/purchase", userGamesController.purchase);

module.exports = router;
