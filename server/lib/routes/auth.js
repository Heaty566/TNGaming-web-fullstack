const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");

router.post("/login", authController.login);

router.get("/loginWithCookie", authController.loginWithCookie);

router.post("/logout", authController.logout);

module.exports = router;
