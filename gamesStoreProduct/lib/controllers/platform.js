const _ = require("lodash");
const ObjectId = require("mongodb").ObjectID;

const { isAdmin, isUser } = require("../middlewares");
const { logger } = require("../logging");
const { platformsValidator, isObjectId } = require("../models/validateSchemas");
const { platformSchema } = require("../models/schemas");

exports.get_all_platforms = [
    isUser,
    async (req, res) => {
        const db = req.app.get("db");

        const platforms = await db.platforms.find().toArray();

        res.json({ success: true, data: platforms });
    },
];

exports.add_new_platforms = [
    isUser,
    isAdmin,
    async (req, res) => {
        //{name: "String"}
        const db = req.app.get("db");
        console.log(req.body);
        //validate new platform

        const { error } = platformsValidator.validatePlatform(_.pick(req.body, ["name"]));
        if (error) return res.status(400).json({ success: false, msg: error.details[0].message });

        //create new platform from schema
        const platforms = platformSchema(_.pick(req.body, ["name"]));

        //checking it's unique
        const isUnique = await db.platforms.findOne({ name: platforms.name });
        if (isUnique) return res.status(400).json({ success: false, msg: "Platform is existed" });

        //inserting new into database

        try {
            const newPlatform = await db.platforms.insertOne(platforms);
            const newPlatformId = newPlatform.insertedId;

            logger.info(`Inserted new platform with ID: ${newPlatformId} `);
            res.json({ success: true });
        } catch (ex) {
            logger.error(`Error inserting tag`);
            res.status(400).json({ success: false, msg: "Error inserting platform" });
        }
    },
];

exports.update_platforms = [
    isUser,
    isAdmin,
    async (req, res) => {
        //{name: "String"}
        const db = req.app.get("db");

        //checking Id
        const { error: isId } = isObjectId("TagId", req.params.id);
        if (isId) return res.status(400).json({ success: false, msg: isId.details[0].message });

        //validate platform

        const { error: isPlatform } = platformsValidator.validatePlatform(_.pick(req.body, ["name"]));
        if (isPlatform) return res.status(400).json({ success: false, msg: isPlatform.details[0].message });

        //getting flatform from request
        const updatePlatform = platformSchema(_.pick(req.body, ["name"]));

        //checking it's unique
        const isUnique = await db.platforms.findOne({ name: updatePlatform.name });
        if (isUnique) return res.status(400).json({ success: false, msg: "Platform is existed" });

        //getting platform from databse
        const platform = await db.platforms.findOne({ _id: ObjectId(req.params.id) });
        if (!platform)
            return res.status(404).json({ success: false, message: "Tag with the given Id was not found" });

        //updating platform
        platform.name = updatePlatform.name;

        //updating to database
        await db.platforms
            .updateOne({ _id: ObjectId(req.params.id) }, { $set: platform })
            .then(() => {
                logger.info(`Updated platform with ID: ${platform._id}`);
                res.json({ success: true });
            })
            .catch(() => {
                logger.error(`Error inserting platform document`);
                res.status(400).json({ success: false, msg: "Error inserting platform document" });
            });
    },
];
