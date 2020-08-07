const express = require("express");
const router = express.Router();

const gamesController = require("../controllers/game");

router.get("/all/:page", gamesController.get_all_game);

router.get("/:id", gamesController.get_game_by_id);

router.get("/sortByTag/:tagId/:page", gamesController.game_sort_by_tag);

router.get("/sortByKey/:key/:page", gamesController.game_sort_by_key);

module.exports = router;
