const express = require("express");
const router = express.Router();

const gamesController = require("../controllers/games");

router.get("/all/:page", gamesController.get_all_image);

router.get("/:id", gamesController.get_image_by_id);

router.get("/sortByGenre/:genreId/:page", gamesController.image_sort_by_genre);

router.get("/sortByKey/:key/:page", gamesController.image_sort_by_key);

module.exports = router;
