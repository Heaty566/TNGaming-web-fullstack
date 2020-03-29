const ObjectId = require("mongodb").ObjectID;
const moment = require("moment");

const { decodeToken } = require("../modules/token");
const { isObjectId } = require("../models/validateSchemas/");

isUser = async (req, res, next) => {
    const db = req.app.get("db");
    const tokenId = req.header("x-auth-token");

    //checking id
    const { error: isId } = isObjectId("Token", tokenId);
    if (isId) return res.status(400).json({ success: false, msg: isId.details[0].message });

    //taking token from database
    const data = await db.collection("tokens").findOne({ _id: ObjectId(tokenId) });
    if (!data) return res.status(403).json({ success: false, msg: "Unauthorized" });

    //checking expired
    if (moment().diff(data.expired, "days") > 3) {
        await db.collection("tokens").deleteOne({ _id: ObjectId(tokenId) });
        return res.status(403).json({ success: false, msg: "Forbidden" });
    }

    //decode token
    const decode = decodeToken(data.token);
    if (!decode) return res.status(403).json({ success: false, msg: "Unauthorized" });
    req.user = decode;
    next();
};

module.exports = { isUser };
