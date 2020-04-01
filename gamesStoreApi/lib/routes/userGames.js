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
    const isNew = user[req.params.compartment].indexOf(String(req.params.gameId));

    if (isNew === -1) user[req.params.compartment].push(String(game._id));

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

    const isNew = user[req.params.compartment].indexOf(req.params.gameId);

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

router.post("/order", [isUser], async (req, res) => {
    //{userId: id, gamesId: id }

    const db = req.app.get("db");

    const user = await db.users.findOne({ _id: ObjectId(req.user._id) });
    if (!user) return res.status(404).json({ success: false, msg: `User with the given Id was not found` });
    if (!user.cart.length) return res.status(400).json({ success: false, msg: "Your cart is empty" });

    Promise.all(
        user.cart.map(async item => {
            const game = await db.games.findOne({ _id: ObjectId(item) });
            if (!game) return res.status(404).json({ success: false, msg: "Game with the given Id was not found" });
            if (user.library.includes(item)) res.status(400).json({ success: false, msg: `You already have ${game.name} in your library` });
            return game.price;
        })
    ).then(async resolve => {
        const totalPrice = resolve.reduce((total, cur) => {
            return Number(total) + Number(cur);
        });

        const order = orderSchema({ userId: req.user._id, cart: user.cart, totalPrice });
        if (user.balance < order.totalPrice) return res.status(402).json({ success: false, msg: "Your balance is not enough" });

        const insertOrder = await db.orders.insertOne({ order });
        if (!insertOrder) {
            logger.error("Error Order Failed");
            return res.status(400).json({ success: false, msg: "Order Failed" });
        }

        user.balance -= order.totalPrice;
        user.cart = [];
        user.library = user.library.concat(order.cart);
        user.history.push(String(insertOrder.insertedId));

        const updateUser = await db.users.updateOne({ _id: ObjectId(req.user._id) }, { $set: user });
        if (!updateUser) {
            logger.error("Error Adding Order to User Failed");
            return res.status(400).json({ success: false, msg: " Adding Order to User" });
        } else {
            res.json({ success: true, data: insertOrder.insertedId });
        }
    });
});

module.exports = router;
