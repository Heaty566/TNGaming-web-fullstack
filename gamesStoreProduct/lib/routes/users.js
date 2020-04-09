const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users");

//get me
router.get("/me", usersController.get_me);

router.post("/addBalance", usersController.add_balance);

//register user
router.post("/register", usersController.register);

//change password
router.post("/changePassword", usersController.change_password);

//change profile
router.post("/changeProfile", usersController.update_profile);

//update avatar
router.post("/uploadAvatar", usersController.update_avatar);

module.exports = router;
