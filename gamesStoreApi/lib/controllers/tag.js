const _ = require("lodash");
const ObjectId = require("mongodb").ObjectID;

const { isUser, isAdmin } = require("../middlewares");
const { logger } = require("../logging");
const { tagsSchema } = require("../models/schemas");
const { tagsValidator, isObjectId } = require("../models/validateSchemas");

exports.get_all_tags = [
  isUser,
  async (req, res) => {
    const db = req.app.get("db");

    const tags = await db.tags.find().sort({ name: 1 }).toArray();

    res.json({ success: true, data: tags });
  },
];

exports.add_new_tags = [
  isUser,
  isAdmin,
  async (req, res) => {
    //{name: "String"}
    const db = req.app.get("db");

    //validate new tag

    const { error } = tagsValidator.validateTag(_.pick(req.body, ["name"]));
    if (error)
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });

    //create new tag from schema
    const tag = tagsSchema(_.pick(req.body, ["name"]));

    //checking it's unique
    const isUnique = await db.tags.findOne({ name: tag.name });
    if (isUnique)
      return res.status(400).json({ success: false, msg: "Tag is existed" });

    //inserting new into database

    try {
      const newTag = await db.tags.insertOne(tag);
      const newTagId = newTag.insertedId;

      logger.info(`Inserted new tag with ID: ${newTagId} `);
      res.json({ success: true });
    } catch (ex) {
      logger.error(`Error inserting tag`);
      res.status(400).json({ success: false, msg: "Error inserting tag" });
    }
  },
];

exports.update_tags = [
  isUser,
  isAdmin,
  async (req, res) => {
    //{name: "String"}
    const db = req.app.get("db");

    //checking Id
    const { error: isId } = isObjectId("TagId", req.params.id);
    if (isId)
      return res
        .status(400)
        .json({ success: false, msg: isId.details[0].message });

    //validate tag

    const { error: isTag } = tagsValidator.validateTag(
      _.pick(req.body, ["name"])
    );
    if (isTag)
      return res
        .status(400)
        .json({ success: false, msg: isTag.details[0].message });

    //getting tag from request
    const updateTag = TagsSchema(_.pick(req.body, ["name"]));

    //checking it's unique
    const isUnique = await db.tags.findOne({ name: updateTag.name });
    if (isUnique)
      return res.status(400).json({ success: false, msg: "Tag is existed" });

    //getting tag from databse
    const tag = await db.tags.findOne({ _id: ObjectId(req.params.id) });
    if (!tag)
      return res
        .status(404)
        .json({
          success: false,
          message: "Tag with the given Id was not found",
        });

    //updating tag
    tag.name = updateTag.name;

    //updating to database
    await db.tags
      .updateOne({ _id: ObjectId(req.params.id) }, { $set: tag })
      .then(() => {
        logger.info(`Updated tag with ID: ${tag._id}`);
        res.json({ success: true });
      })
      .catch(() => {
        logger.error(`Error inserting tag document`);
        res
          .status(400)
          .json({ success: false, msg: "Error inserting tag document" });
      });
  },
];
