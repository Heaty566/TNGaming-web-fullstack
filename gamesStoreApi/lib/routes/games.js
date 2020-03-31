const ObjectId = require("mongodb").ObjectID;
const express = require("express");
const _ = require("lodash");
const router = express.Router();

const config = require("../../config/games.json");
const { isObjectId } = require("../models/validateSchemas/");

router.get("/all/:page", async (req, res) => {
    const db = req.app.get("db");
    if (req.params.page < 1) req.params.page = 1;

    const games = await db.games.find().toArray();

    const filter = _(games)
        .slice((req.params.page - 1) * config.page.pageSize)
        .take(config.page.pageSize)
        .value();

    res.json({ success: true, data: filter });
});

router.get("/:id", async (req, res) => {
    const db = req.app.get("db");

    const { error: isId } = isObjectId("Game", req.params.id);
    if (isId) return res.status(400).json({ success: true, msg: isId.details[0].message });

    const game = await db.games.findOne({ _id: ObjectId(req.params.id) });
    if (!game) return res.status(404).json({ success: true, msg: "Game with the given Id was not found" });

    res.json({ success: true, data: game });
});

router.get("/sortByGenre/:genreId/:page", async (req, res) => {
    const db = req.app.get("db");
    if (req.params.page < 1) req.params.page = 1;

    const genre = await db.genres.findOne({ _id: ObjectId(req.params.genreId) });
    if (!genre) return res.status(404).json({ success: false, msg: "Genre with the given Id was not found" });

    const games = await db.games.find({ genreId: String(genre._id) }).toArray();
    const filter = _(games)
        .slice((req.params.page - 1) * config.page.pageSize)
        .take(config.page.pageSize)
        .value();

    res.json({ success: true, data: filter });
});

router.get("/sortByKey/:key/:page", async (req, res) => {
    const db = req.app.get("db");
    if (req.params.page < 1) req.params.page = 1;

    const games = await db.games.find().toArray();

    const search = games.filter(item => item.name.toLowerCase().includes(req.params.key.toLowerCase()));

    const filter = _(search)
        .slice((req.params.page - 1) * config.page.pageSize)
        .take(config.page.pageSize)
        .value();

    res.json({ success: true, data: filter });
});

module.exports = router;
