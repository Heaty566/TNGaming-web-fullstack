const express = require("express");
const router = express.Router();

const platformController = require("../controllers/platform");

//getting all platforms
router.get("/all", platformController.get_all_platforms);

//inserting new platform
router.post("/new", platformController.add_new_platforms);

//inserting update platform
router.put("/:id", platformController.update_platforms);

module.exports = router;
