const express = require("express");
const router = express.Router();

const genresController = require("../controllers/genres");

//getting all genres
router.get("/", genresController.get_all_genres);

//inserting new genre
router.post("/new", genresController.add_new_genre);

router.put("/:id", genresController.update_genre);

module.exports = router;
