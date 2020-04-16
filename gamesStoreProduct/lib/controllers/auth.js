const ObjectId = require("mongodb").ObjectID;
const bcrypt = require("bcrypt");
const _ = require("lodash");

const { logger } = require("../logging");
const { isUser } = require("../middlewares/");
const { tokenSchema } = require("../models/schemas");
const { validateLoginUser } = require("../models/validateSchemas");
const { createToken, decodeToken } = require("../utils/token");

exports.login = async (req, res) => {
    const db = req.app.get("db");
    //validate User
    const { error: isLoginUser } = validateLoginUser(_.pick(req.body, ["username", "password"]));
    if (isLoginUser)
        return res.status(400).json({
            success: false,
            msg: isLoginUser.details[0].message,
        });

    //get user from database
    const user = await db.users.findOne(_.pick(req.body, ["username"]));
    if (!user)
        return res.status(400).json({
            success: false,
            msg: "Invalid username or password",
        });

    //checking password
    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect)
        return res.status(400).json({
            success: false,
            msg: "Invalid username or password",
        });

    //create new Token
    const token = createToken(
        _.pick(user, ["_id", "username", "name", "isDeveloper", "isAdmin", "balance", "avatar"])
    );

    //create new token in db
    try {
        const tokenDB = await db.collection("tokens").insertOne(tokenSchema(token));

        res.json({
            success: true,
            data: {
                token: tokenDB.insertedId,
                user: _.pick(user, [
                    "_id",
                    "username",
                    "name",
                    "isDeveloper",
                    "isAdmin",
                    "balance",
                    "avatar",
                ]),
                success: true,
            },
        });
    } catch (ex) {
        logger.error("Error logging user");
        res.json({
            success: false,
        });
    }
};

exports.loginWithCookie = [
    isUser,
    async (req, res) => {
        res.json({ success: true, data: req.user });
    },
];

exports.logout = [
    isUser,
    async (req, res) => {
        const db = req.app.get("db");
        const tokenId = req.header("x-auth-token");

        //get token from database
        const logout = await db.tokens.findOne({
            _id: ObjectId(tokenId),
        });
        if (!logout)
            return res.status(404).json({
                success: false,
                msg: "failed to logout",
            });

        //decode token
        const decode = await decodeToken(logout.token);
        if (decode._id === req.user._id) {
            await db.tokens
                .deleteOne({
                    _id: ObjectId(tokenId),
                })
                .then(() =>
                    res.json({
                        success: true,
                    })
                );
        } else {
            res.status(400).json({
                success: false,
                msg: "logout failed",
            });
        }
    },
];
