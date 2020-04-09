const express = require("express");
const router = express.Router();

const developersContronller = require("../controllers/developers");

//update game
router.put("/games/:id", developersContronller.update_game);

//restock game
router.patch("/games/restock/:id", developersContronller.restock_game);

//add new game
router.post("/games/new", developersContronller.update_game);

//detele game
router.delete("/games/:id", developersContronller.delete_game);

module.exports = router;
