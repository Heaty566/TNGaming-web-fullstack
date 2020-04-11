const moment = require("moment");
const ObjectId = require("mongodb").ObjectID;

const { isObjectId } = require("../models/validateSchemas/");
const { isAdmin, isUser } = require("../middlewares/");
const { logger } = require("../logging");

exports.get_all_users = [
    isUser,
    isAdmin,
    async (req, res) => {
        const db = req.app.get("db");

        const users = await db.users.find().toArray();

        res.json({ success: true, data: users });
    },
];

exports.add_property = [
    isUser,
    isAdmin,
    async (req, res) => {
        // {collection: String, fieldName: String, defaultValue: any }
        const db = req.app.get("db");

        const data = await db.collection(req.body.collection).find().toArray();
        data.map(async (item) => {
            item[req.body.fieldName] = req.body.defaultValue;
            await db
                .collection(req.body.collection)
                .updateOne({ _id: ObjectId(item._id) }, { $set: item });
        });

        logger.info(
            `Added ${req.body.fieldName} to ${req.body.collection} collection.`
        );
        res.json({ data, success: true });
    },
];

exports.delete_property = [
    isUser,
    isAdmin,
    async (req, res) => {
        // {collection: String, fieldName: String }
        const db = req.app.get("db");

        const data = await db.collection(req.body.collection).find().toArray();
        data.map(async (item) => {
            delete item[req.body.fieldName];
            await db
                .collection(req.body.collection)
                .updateOne({ _id: ObjectId(item._id) }, { $set: item });
        });

        logger.info(
            `deleted ${req.body.fieldName} to ${req.body.collection} collection.`
        );
        res.json({ data, success: true });
    },
];

exports.clean_token = [
    isUser,
    isAdmin,
    async (req, res) => {
        const db = req.app.get("db");

        const tokens = await db.tokens.find().toArray();
        if (!tokens)
            return res.status(400).json({ success: false, msg: "No Token!" });

        tokens.map(async (item) => {
            const isExpired = moment().diff(item.expired, "days");
            if (isExpired > 3)
                await db.tokens.deleteOne({ _id: ObjectId(item._id) });
        });

        logger.info("Cleaned all useless tokens.");
        res.json({ success: true, msg: "Cleaned all useless tokens." });
    },
];

exports.toggle_admin = [
    isUser,
    isAdmin,
    async (req, res) => {
        const db = req.app.get("db");

        const { error } = isObjectId("UserId", req.params.id);
        if (error)
            return res
                .status(400)
                .json({ success: false, msg: error.details[0].message });

        const user = await db.users.findOne({ _id: ObjectId(req.params.id) });
        if (!user)
            return res.status(404).json({
                success: false,
                msg: "User with the given Id was not found",
            });
        user.isAdmin = !user.isAdmin;

        await db.users.updateOne({ _id: ObjectId(user._id) }, { $set: user });
        logger.info(
            `${user.username} has been toggoled admin role: ${user.isAdmin}`
        );
        res.json({
            success: true,
            msg: `${user.username} have been toggoled admin role.`,
        });
    },
];

exports.toggle_developer = [
    isUser,
    isAdmin,
    async (req, res) => {
        const db = req.app.get("db");

        const { error } = isObjectId("UserId", req.params.id);
        if (error)
            return res
                .status(400)
                .json({ success: false, msg: error.details[0].message });

        const user = await db.users.findOne({ _id: ObjectId(req.params.id) });
        if (!user)
            return res.status(404).json({
                success: false,
                msg: "User with the given Id was not found",
            });
        user.isDeveloper = !user.isDeveloper;

        await db.users.updateOne({ _id: ObjectId(user._id) }, { $set: user });
        logger.info(
            `${user.username} has been toggoled developer role: ${user.isDeveloper}`
        );
        res.json({
            success: true,
            msg: `${user.username} have been toggoled developer role.`,
        });
    },
];
