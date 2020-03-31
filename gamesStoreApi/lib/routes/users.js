const express = require("express");
const bcrypt = require("bcrypt");
const ObjectId = require("mongodb").ObjectID;
const rimraf = require("rimraf");
const _ = require("lodash");
const router = express.Router();

const { uploadAvatar } = require("../modules/uploadImage/");
const { validateUser, validateUpdatePassword, validateUpdateProfile, validateAddBalance } = require("../models/validateSchemas");
const { logger } = require("../logging");
const { isUser } = require("../middlewares/");
const { userSchema } = require("../models/schemas");

//get me
router.get("/me", [isUser], async (req, res) => {
    const db = req.app.get("db");

    //get user from database
    const user = await db.users.findOne({ _id: ObjectId(req.user._id) });

    res.json({ success: true, data: user });
});

router.post("/addBalance", [isUser], async (req, res) => {
    //{balance: Number}
    const db = req.app.get("db");

    //validate balance
    const { error } = validateAddBalance(_.pick(req.body, ["balance"]));
    if (error) return res.status(400).json({ success: false, msg: error.details[0].message });

    //get user from database
    const user = await db.users.findOne({ _id: ObjectId(req.user._id) });
    if (!user) return res.status(404).json({ success: false, msg: "User with the given Id was not found" });

    //update user
    user.balance = Number(user.balance) + Number(req.body.balance);

    //update new password
    const updateUser = await db.users.updateOne({ _id: ObjectId(req.user._id) }, { $set: user });
    if (!updateUser) {
        logger.error("Error adding balance");
        return res.status(400).json({ success: false, msg: "adding balance failed" });
    }

    res.json({ success: true, msg: "Added balance" });
});

//register user
router.post("/register", async (req, res) => {
    //{name: "String", username: "String", email: "String", password: "String", confirm: "String", phone: "String", address: "String"}
    const db = req.app.get("db");

    //validate user
    const { error: isUser } = validateUser(_.pick(req.body, ["name", "username", "password", "confirm", "email", "phone", "address"]));
    if (isUser) return res.status(400).json({ success: false, msg: isUser.details[0].message });

    //create new user
    const user = userSchema(_.pick(req.body, ["name", "username", "password", "email", "phone", "address"]));

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

//change password
router.post("/changePassword", [isUser], async (req, res) => {
    //{confirm: "String", password: "String", "oldPassword": "String"}
    const db = req.app.get("db");

    const { error } = validateUpdatePassword(_.pick(req.body, ["confirm", "password", "oldPassword"]));
    if (error) return res.status(400).json({ success: false, msg: error.details[0].message });

    //get user from database
    const user = await db.users.findOne({ _id: ObjectId(req.user._id) });
    if (!user) return res.status(404).json({ success: false, msg: "User with the given Id was not found" });

    //checking is correct password
    const isCorrect = await bcrypt.compare(req.body.oldPassword, user.password);
    if (!isCorrect) return res.status(400).json({ success: false, msg: "Old password doesn't match" });

    //hashing new password
    const salt = await bcrypt.genSalt(6);
    user.password = await bcrypt.hash(req.body.password, salt);

    //update new password
    const updateUser = await db.users.updateOne({ _id: ObjectId(req.user._id) }, { $set: user });
    if (!updateUser) {
        logger.error("Error updating password");
        return res.status(400).json({ success: false, msg: "Update password failed" });
    }

    res.json({ success: true, msg: "Updated password" });
});

//change profile
router.post("/changeProfile", [isUser], async (req, res) => {
    //{name: String, email: Email, phone: String, address: String}
    const db = req.app.get("db");

    //validate profile
    const { error } = validateUpdateProfile(_.pick(req.body, ["name", "email", "phone", "address"]));
    if (error) return res.status(400).json({ success: false, msg: error.details[0].message });

    //get user from database
    const user = await db.users.findOne({ _id: ObjectId(req.user._id) });
    if (!user) return res.status(404).json({ success: false, msg: "User with the given Id was not found" });

    //update user
    user.name = req.body.name;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.address = req.body.address;

    //update new password
    const updateUser = await db.users.updateOne({ _id: ObjectId(req.user._id) }, { $set: user });
    if (!updateUser) {
        logger.error("Error updating profile");
        return res.status(400).json({ success: false, msg: "Update profile failed" });
    }

    res.json({ success: true, msg: "Updated profile" });
});

//update avatar
router.post("/uploadAvatar", [isUser], (req, res) => {
    //{avatar: Image}
    const db = req.app.get("db");
    uploadAvatar(req, res, async error => {
        if (error) {
            if (error.code === "LIMIT_FILE_SIZE") return res.status(400).json({ success: false, msg: "This file must be smaller or equal 1mb" });
            return res.status(400).json({ success: false, msg: error });
        }

        const user = await db.users.findOne({ _id: ObjectId(req.user._id) });
        if (!user) return res.status(404).json({ success: false, msg: "User with the given Id was not found" });

        rimraf(user.avatar, err => {
            if (err) logger.error("Error Deleting avatar folder");
        });

        user.avatar = `${req.file.destination}/${req.file.filename}`;

        const image = await db.users.updateOne({ _id: ObjectId(req.user._id) }, { $set: user });
        if (!image) return res.status(400).json({ success: false, msg: "Updating user failed" });

        res.json({ success: true, msg: "Updated avatar" });
    });
});

module.exports = router;
