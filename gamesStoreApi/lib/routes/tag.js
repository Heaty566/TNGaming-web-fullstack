const express = require("express");
const router = express.Router();

const tagsController = require("../controllers/tag");

//getting all tags
router.get("/all", tagsController.get_all_tags);

//inserting new tag
router.post("/new", tagsController.add_new_tags);

//inserting update tag
router.put("/:id", tagsController.update_tags);

module.exports = router;
