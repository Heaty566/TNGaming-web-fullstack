const _ = require("lodash");
const ObjectId = require("mongodb").ObjectID;
const express = require("express");
const router = express.Router();

const { isUser, isAdmin } = require("../middlewares/");
const { logger } = require("../logging");
const { genresSchema } = require("../models/schemas");
const { validateGenre, isObjectId } = require("../models/validateSchemas");

const glob = require("glob");
router.get("/all", async (req, res) => {
    const all = glob.sync("./public/images/**/*.jpg");
    const images = all.map(item => item.replace("./public", ""));
    res.json(images);
});

//getting all genres
router.get("/", async (req, res) => {
    const db = req.app.get("db");

    const genres = await db.genres.find().toArray();

    res.json({ success: true, data: genres });
});

//inserting new genre
router.post("/new", [isUser, isAdmin], async (req, res) => {
    //{name: "String"}
    const db = req.app.get("db");

    //validate new genre
    const { error } = validateGenre(_.pick(req.body, ["name"]));
    if (error) return res.status(400).json({ success: false, msg: error.details[0].message });

    //create new genre from schema
    const genre = genresSchema(_.pick(req.body, ["name"]));

    //checking it's unique
    const isUnique = await db.genres.findOne({ name: genre.name });
    if (isUnique) return res.status(400).json({ success: false, msg: "Genre is existed" });

    //inserting new into database
    try {
        const newGenre = await db.genres.insertOne(genre);
        const newGenreId = newGenre.insertedId;

        logger.info(`Inserted new genre with ID: ${newGenreId} `);
        res.json({ success: true });
    } catch (ex) {
        logger.error(`Error inserting genre`);
        res.status(400).json({ success: false, msg: "Error inserting genre" });
    }
});

router.put("/:id", [isUser, isAdmin], async (req, res) => {
    //{name: "String"}
    const db = req.app.get("db");

    //checking Id
    const { error: isId } = isObjectId("GenreId", req.params.id);
    if (isId) return res.status(400).json({ success: false, msg: isId.details[0].message });

    //validate genre
    const { error: isGenre } = validateGenre(_.pick(req.body, ["name"]));
    if (isGenre) return res.status(400).json({ success: false, msg: isGenre.details[0].message });

    //getting genre from request
    const updateGenre = genresSchema(_.pick(req.body, ["name"]));

    //checking it's unique
    const isUnique = await db.genres.findOne({ name: updateGenre.name });
    if (isUnique) return res.status(400).json({ success: false, msg: "Genre is existed" });

    //getting genre from databse
    const genre = await db.genres.findOne({ _id: ObjectId(req.params.id) });
    if (!genre) return res.status(404).json({ success: false, message: "Genre with the given Id was not found" });

    //updating genre
    genre.name = updateGenre.name;

    //updating to database
    await db.genres
        .updateOne({ _id: ObjectId(req.params.id) }, { $set: genre })
        .then(() => {
            logger.info(`Updated genre with ID: ${genre._id}`);
            res.json({ success: true });
        })
        .catch(() => {
            logger.error(`Error inserting document`);
            res.status(400).json({ success: false, msg: "Error inserting document" });
        });
});

module.exports = router;
