const express = require("express");
const ObjectId = require("mongodb").ObjectID;
const rimraf = require("rimraf");
const router = express.Router();
const _ = require("lodash");

const { logger } = require("../logging");
const { uploadImageGame } = require("../modules/uploadImage/");
const { isUser, isDeveloper } = require("../middlewares/");
const { gameSchema } = require("../models/schemas/");
const { validateGameNew, validateGameRestock, validateGameUpdate, isObjectId } = require("../models/validateSchemas/");

//update game
router.put("/games/:id", [isUser, isDeveloper], async (req, res) => {
    const db = req.app.get("db");

    const { error: isId } = isObjectId("Game", req.params.id);
    if (isId) return res.status(400).json({ success: false, msg: isId.details[0].message });

    const { error: isGameError } = validateGameUpdate(_.pick(req.body, ["name", "genreId", "description", "price", "available"]));
    if (isGameError) return res.status(400).json({ success: false, msg: isGameError.details[0].message });

    const game = await db.games.findOne({ _id: ObjectId(req.params.id) });
    if (!game) return res.status(404).json({ success: false, msg: "Game with the given Id was not found" });

    if (game.developerId != req.user._id) return res.status(403).json({ success: false, msg: "Forbidden" });
    game.name = req.body.name;
    game.genreId = req.body.genreId;
    game.description = req.body.description;
    game.price = req.body.price;
    game.available = req.body.available;

    const updateGame = await db.games.updateOne({ _id: ObjectId(req.params.id) }, { $set: game });
    if (!updateGame) {
        logger.error("Error restock game");
        return res.status(400).json({ success: false, msg: "Updating game failed" });
    }

    logger.info(`Updated game with the Id: ${game._id}`);
    res.json({ success: true, msg: `Game has been updated` });
});

//restock game
router.patch("/games/restock/:id", [isUser, isDeveloper], async (req, res) => {
    const db = req.app.get("db");

    const { error: isId } = isObjectId("Game", req.params.id);
    if (isId) return res.status(400).json({ success: false, msg: isId.details[0].message });

    const { error: isRestock } = validateGameRestock(req.body.stock);
    if (isRestock) return res.status(400).json({ success: false, msg: isRestock.details[0].message });

    const game = await db.games.findOne({ _id: ObjectId(req.params.id) });
    if (!game) return res.status(404).json({ success: false, msg: "Game with the given Id was not found" });

    if (game.developerId != req.user._id) return res.status(403).json({ success: false, msg: "Forbidden" });
    game.stock = Number(game.stock) + Number(req.body.stock);

    const updateGame = await db.games.updateOne({ _id: ObjectId(req.params.id) }, { $set: { stock: game.stock } });
    if (!updateGame) {
        logger.error("Error restock game");
        return res.status(400).json({ success: false, msg: "Updating game failed" });
    }

    res.json({ success: true, msg: `Game has been added more ${req.body.stock}` });
});

router.post("/games/new", [isUser, isDeveloper], async (req, res) => {
    //{name: String, price: Number, genreId: genre,  decription: String, available: boolean, stock: number, imagesGame: Image limits 10}
    const db = req.app.get("db");
    uploadImageGame(req, res, async error => {
        if (error) {
            if (error.code === "LIMIT_FILE_SIZE") return res.status(400).json({ success: false, msg: "This file must be smaller or equal 2mb" });
            return res.status(400).json({ success: false, msg: error });
        }

        const images = req.files.map(file => `${file.destination}/${file.filename}`.replace("./public", ""));

        //validate game
        const { error: isGame } = validateGameNew(
            _.pick(req.body, ["name", "price", "genreId", "description", "available", "stock", "date", "publisher"])
        );
        if (isGame) return res.status(400).json({ success: false, msg: isGame.details[0].message });

        //find user from database
        const user = await db.users.findOne({ _id: ObjectId(req.user._id) });
        if (!user) return res.status(404).json({ success: false, msg: "User with the given Id was not found" });

        //format before inserting
        const game = gameSchema(_.pick(req.body, ["name", "price", "genreId", "description", "available", "stock"]));

        const uniqueGenres = req.body.genreId.filter((value, index, array) => array.indexOf(value) === index);
        uniqueGenres.map(async item => {
            const genre = await db.genres.findOne({ _id: ObjectId(item) });
            if (!genre) return res.status(404).json({ success: false, msg: "Genre with the given Id was not found" });
        });

        game.genreId = uniqueGenres;
        game.developerId = user._id;
        game.images = images;

        try {
            const newGame = await db.games.insertOne(game);
            const gameId = newGame.insertedId;
            user.gamesDev.push(gameId);
            await db.users.updateOne({ _id: ObjectId(user._id) }, { $set: user });

            logger.info(`Inserted new game with Id: ${gameId}`);
            res.json({ success: true });
        } catch (ex) {
            logger.erorr("Error inserting games");
            res.status(400).json({ success: false, msg: "Error inserting game" });
        }
    });
});

//detele game
router.delete("/games/:id", [isUser, isDeveloper], async (req, res) => {
    const db = req.app.get("db");

    const { error: isId } = isObjectId("Game", req.params.id);
    if (isId) return res.status(400).json({ success: false, msg: isId.details[0].message });

    const game = await db.games.findOne({ _id: ObjectId(req.params.id) });
    if (!game) return res.status(404).json({ success: false, msg: "Game with the given Id was not found" });

    if (game.developerId != req.user._id) return res.status(403).json({ success: false, msg: "Forbidden" });

    const updateGame = await db.games.deleteOne({ _id: ObjectId(req.params.id) });
    if (!updateGame) {
        logger.error("Error restock game");
        return res.status(400).json({ success: false, msg: "Deleting game failed" });
    }
    game.images.map(item => {
        rimraf(item, error => {
            if (error) logger.error(`Error deleted images game`);
        });
    });

    logger.info(`Deleted game with the Id: ${game._id}`);
    res.json({ success: true, msg: `Game has been deleted` });
});

module.exports = router;
