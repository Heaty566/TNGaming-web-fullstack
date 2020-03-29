const express = require("express");
const bcrypt = require("bcrypt");
var ObjectId = require("mongodb").ObjectID;
const _ = require("lodash");
const router = express.Router();

const { validateUser } = require("../models/validateSchemas");
const { logger } = require("../logging");
const { userSchema } = require("../models/schemas");

router.get("/", async (req, res) => {
    const db = req.app.get("db");

    //get users from database
    const users = await db.users.find({}).toArray();

    res.json({ success: true, data: users });
});

router.post("/register", async (req, res) => {
    const db = req.app.get("db");

    //validate user
    const { error: isUser } = validateUser(_.pick(req.body, ["name", "username", "password", "email", "phone", "address", "isDeveloper"]));
    if (isUser) return res.status(400).json({ success: false, msg: isUser.details[0].message });

    //create new user
    const user = userSchema(_.pick(req.body, ["name", "username", "password", "email", "phone", "address", "isDeveloper"]));

    //checking user is unique
    const isUnique = await db.users.findOne({ username: user.username });
    if (isUnique) return res.status(400).json({ success: false, msg: "Username is taken" });

    //hashing password
    const salt = await bcrypt.genSalt(6);
    user.password = await bcrypt.hash(user.password, salt);

    //inserting new into database
    try {
        const newUser = await db.users.insertOne(user);
        const newUserId = newUser.insertedId;

        logger.info(`Inserted a new user with ID: ${newUserId}`);
        res.json({ success: true });
    } catch (ex) {
        logger.error("Error inserting User");
        res.status(400).json({ success: false, msg: "Error inserting user" });
    }
});

module.exports = router;
