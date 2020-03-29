const express = require("express");
const router = express.Router();
var ObjectId = require("mongodb").ObjectID;
const bcrypt = require("bcrypt");
const _ = require("lodash");

const { logger } = require("../logging");
const { tokenSchema } = require("../models/schemas");
const { validateLoginUser } = require("../models/validateSchemas");
const { createToken, decodeToken } = require("../modules/token");

router.post("/login", async (req, res) => {
    const db = req.app.get("db");

    //validate User
    const { error: isLoginUser } = validateLoginUser(_.pick(req.body, ["username", "password"]));
    if (isLoginUser) return res.status(400).json({ success: false, msg: isLoginUser.details[0].message });

    //get user from database
    const user = await db.users.findOne(_.pick(req.body, ["username"]));
    if (!user) return res.status(404).json({ success: false, msg: "User with the given Id was not found" });

    //checking password
    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) return res.status(400).json({ success: false, msg: "Invalid username or password" });

    //create new Token
    const token = createToken(_.pick(user, ["_id", "username", "name", "isDeveloper", "isAdmin"]));

    //create new token in db
    try {
        const tokenDB = await db.collection("tokens").insertOne(tokenSchema(token));

        res.json({
            success: true,
            data: {
                token: tokenDB.insertedId,
                user: _.pick(user, ["_id", "username", "name", "isDeveloper", "isAdmin"])
            }
        });
    } catch (ex) {
        logger.error("Error logging user");
        res.json({
            success: false
        });
    }
});

router.post("/logout", async (req, res) => {
    const db = req.app.get("db");

    //get token from database
    const logout = await db.tokens.findOne({ _id: ObjectId(req.body.token) });
    if (!logout) return res.status(404).json({ success: false, msg: "failed to logout" });

    //decode token
    const decode = await decodeToken(logout.token);
    if (decode._id === req.body.userId) {
        await db.tokens.deleteOne({ _id: ObjectId(req.body.token) }).then(() => res.json({ success: true }));
    } else {
        res.json({ success: false, msg: "logout failed" });
    }
});

module.exports = router;
