const moment = require("moment");
const ObjectId = require("mongodb").ObjectID;
const express = require("express");
const router = express.Router();

const { isObjectId } = require("../models/validateSchemas/");
const { isAdmin, isUser } = require("../middlewares/");
const { logger } = require("../logging");

router.get("/allusers", [isUser, isAdmin], async (req, res) => {
    const db = req.app.get("db");

    const genres = await db.genres.find().toArray();

    res.json({ success: true, data: genres });
});

router.post("/cleantoken", [isUser, isAdmin], async (req, res) => {
    const db = req.app.get("db");

    const tokens = await db.tokens.find().toArray();
    if (!tokens) return res.status(400).json({ success: false, msg: "No Token!" });

    tokens.map(async item => {
        const isExpired = moment().diff(item.expired, "days");
        if (isExpired > 3) await db.tokens.deleteOne({ _id: ObjectId(item._id) });
    });

    logger.info("Cleaned all useless tokens.");
    res.json({ success: true, msg: "Cleaned all useless tokens." });
});

router.post("/toggleAdmin/:id", [isUser, isAdmin], async (req, res) => {
    const db = req.app.get("db");

    const { error } = isObjectId("UserId", req.params.id);
    if (error) return res.status(400).json({ success: false, msg: error.details[0].message });

    const user = await db.users.findOne({ _id: ObjectId(req.params.id) });
    if (!user) return res.status(404).json({ success: false, msg: "User with the given Id was not found" });
    user.isAdmin = !user.isAdmin;

    await db.users.updateOne({ _id: ObjectId(user._id) }, { $set: user });
    logger.info(`${user.username} has been toggoled admin role: ${user.isAdmin}`);
    res.json({ success: true, msg: `${user.username} have been toggoled admin role.` });
});

router.post("/toggleDeveloper/:id", [isUser, isAdmin], async (req, res) => {
    const db = req.app.get("db");

    const { error } = isObjectId("UserId", req.params.id);
    if (error) return res.status(400).json({ success: false, msg: error.details[0].message });

    const user = await db.users.findOne({ _id: ObjectId(req.params.id) });
    if (!user) return res.status(404).json({ success: false, msg: "User with the given Id was not found" });
    user.isDeveloper = !user.isDeveloper;

    await db.users.updateOne({ _id: ObjectId(user._id) }, { $set: user });
    logger.info(`${user.username} has been toggoled developer role: ${user.isDeveloper}`);
    res.json({ success: true, msg: `${user.username} have been toggoled developer role.` });
});

module.exports = router;
