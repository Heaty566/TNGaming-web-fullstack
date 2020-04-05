const express = require("express");
const ObjectId = require("mongodb").ObjectID;
const router = express.Router();

const { isUser } = require("../middlewares/");
const { orderSchema } = require("../models/schemas/");
const { isObjectId } = require("../models/validateSchemas/");
const { logger } = require("../logging");

router.post("/addGameTo/:compartment/:gameId", [isUser], async (req, res) => {
    //{gameId: _id}
    const db = req.app.get("db");

    const { error: isId } = isObjectId("Game", req.params.gameId);
    if (isId) return res.status(400).json({ success: false, msg: isId.details[0].message });

    const user = await db.users.findOne({ _id: ObjectId(req.user._id) });
    if (!user) return res.status(404).json({ success: false, msg: `User with the given Id was not found` });

    const isCompartment = Object.keys(user).includes(req.params.compartment);
    if (!isCompartment) return res.status(400).json({ success: false, msg: `Compartment is invalid` });

    const game = await db.games.findOne({ _id: ObjectId(req.params.gameId) });
    if (!game) return res.status(404).json({ success: false, msg: `Game with the given Id was not found` });
    const isNew = user[req.params.compartment].map((item) => item.toString()).indexOf(req.params.gameId);

    if (isNew === -1) user[req.params.compartment].push(game._id);

    const updateUser = await db.users.updateOne(
        { _id: ObjectId(req.user._id) },
        { $set: { [req.params.compartment]: user[req.params.compartment] } }
    );
    if (!updateUser) {
        logger.error(`Error User adding ${req.params.compartment}`);
        return res.status(400).json({ status: false, msg: `Update ${req.params.compartment} failed` });
    }

    res.json({ success: true });
});

router.post("/removeGameFrom/:compartment/:gameId", [isUser], async (req, res) => {
    //{gameId: _id}
    const db = req.app.get("db");

    const { error: isId } = isObjectId("Game", req.params.gameId);
    if (isId) return res.status(400).json({ success: false, msg: isId.details[0].message });

    const user = await db.users.findOne({ _id: ObjectId(req.user._id) });
    if (!user) return res.status(404).json({ success: false, msg: `User with the given Id was not found` });

    const isCompartment = Object.keys(user).includes(req.params.compartment);
    if (!isCompartment) return res.status(400).json({ success: false, msg: `Compartment is invalid` });

    const game = await db.games.findOne({ _id: ObjectId(req.params.gameId) });
    if (!game) return res.status(404).json({ success: false, msg: `Game with the given Id was not found` });

    const isNew = user[req.params.compartment].map((id) => id.toString()).indexOf(req.params.gameId);

    if (isNew !== -1) user[req.params.compartment] = user[req.params.compartment].filter((item, index) => index !== isNew);

    const updateUser = await db.users.updateOne(
        { _id: ObjectId(req.user._id) },
        { $set: { [req.params.compartment]: user[req.params.compartment] } }
    );
    if (!updateUser) {
        logger.error(`Error User removing ${req.params.compartment}`);
        return res.status(400).json({ status: false, msg: `Update ${req.params.compartment} failed` });
    }

    res.json({ success: true });
});

router.post("/purchase", [isUser], async (req, res) => {
    //{userId}

    //gettting user
    const db = req.app.get("db");
    const user = await db.users.findOne({ _id: ObjectId(req.user._id) });
    if (!user) return res.status(404).json({ success: false, msg: "User with the given Id was not found" });

    //checking cart empty
    if (!user.cart.length) return res.status(400).json({ success: false, msg: "Empty cart" });

    //checking Id game
    Promise.all(
        user.cart.map(async (gameId) => {
            const game = await db.games.findOne({ _id: ObjectId(gameId) });
            if (!game) return Promise.reject({ success: false, msg: "The game in your cart doesn't exist" });

            const isUnique = user.library.map((id) => id.toString()).includes(game._id.toString());
            if (isUnique) return Promise.reject({ success: false, msg: `you owned ${game.name}` });

            return Promise.resolve(game);
        })
    )
        .then(async (games) => {
            const totalPrice = games.map((game) => game.price).reduce((total, current) => total + current);
            //checking balance is enought to buy
            if (user.balance < totalPrice) return res.status(400).json({ success: false, msg: "Your balance doesn't enough money" });

            //create order schema
            // inserting order
            const order = await db.orders.insertOne(orderSchema({ userId: user._id, cart: games, totalPrice }));
            if (!order) {
                logger.error("Error Inseting game Order");
                res.status(400).json({ success: false, msg: "Update your order failed" });
            }

            //minus user balance
            //set cart history and library
            user.balance -= totalPrice;
            user.library = user.library.concat(games.map((game) => game._id));
            user.cart = [];
            user.history.push(order.insertedId);

            //updateing user
            const updateUser = await db.users.updateOne({ _id: ObjectId(req.user._id) }, { $set: user });
            if (!updateUser) {
                logger.error("Update user on order failed");
                return res.status(400).json({ success: false, msg: "Update your account failed" });
            }

            return Promise.all(
                games.map(async (game) => {
                    const developer = await db.users.findOne({ _id: ObjectId(game.developerId) });
                    if (!developer) {
                        logger.error("Update find developer on order failed");
                        return Promise.reject({ success: false, msg: "Update your account failed" });
                    }
                    developer.balance += game.price;
                    await db.users.updateOne({ _id: ObjectId(game.developerId) }, { $set: developer });
                    return Promise.resolve({ success: true, msg: "Purchase success" });
                })
            );
        })
        .then((result) => res.json(result))
        .catch((ex) => {
            return res.status(400).json(ex);
        });

    //updateing developer balance
});

module.exports = router;
