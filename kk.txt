const express = require("express");
const ObjectId = require("mongodb").ObjectID;
const router = express.Router();
const _ = require("lodash");

const { logger } = require("../logging");
const { isUser, isDeveloper } = require("../middlewares/");
const { gameSchema } = require("../models/schemas/");
const { validateGame } = require("../models/validateSchemas/");

router.post("/games/new", [isUser, isDeveloper], async (req, res) => {
    //{name: String, price: Number, genreId: genre,  decription: String, available: boolean, stock: number}
    const db = req.app.get("db");

    const { validateGame: isGame } = validateGame(_.pick(req.body, ["name", "price", "genreId", "description", "available", "stock"]));
    if (isGame) return res.status(400).json({ success: false, msg: isGame.details[0].message });

    const user = await db.users.findOne({ _id: ObjectId(req.user._id) });
    if (!user) return res.status(404).json({ success: false, msg: "User with the given Id was not found" });

    const game = gameSchema(_.pick(req.body, ["name", "price", "genreId", "description", "available", "stock"]));
    const uniqueGenres = req.body.genreId.filter((value, index, array) => array.indexOf(value) === index);
    game.genreId = uniqueGenres;
    game.developerId = user._id;

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

module.exports = router;
