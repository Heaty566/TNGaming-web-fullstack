const express = require("express");
const router = express.Router();

const developersContronller = require("../controllers/developer");

//update game
router.put("/games/:id", developersContronller.update_game);

//restock game
router.patch("/games/restock/:id", developersContronller.restock_game);

//add new game
router.post("/games/new", developersContronller.add_new_game);

//detele game
router.delete("/games/:id", developersContronller.delete_game);

module.exports = router;
