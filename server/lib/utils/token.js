const jwt = require("jsonwebtoken");
const config = require("../../config/user.json");
const { logger } = require("../logging");

createToken = obj => {
    return jwt.sign(obj, config.tokenKey);
};

decodeToken = token => {
    try {
        const decode = jwt.verify(token, config.tokenKey);
        return decode;
    } catch (ex) {
        logger.error("Error decoding token");
    }
};

module.exports = { createToken, decodeToken };
