const { genresSchema } = require("./genres");
const { userSchema } = require("./users");
const { tokenSchema } = require("./token");
const { gameSchema } = require("./games");
const { orderSchema } = require("./orders");

module.exports = { genresSchema, userSchema, tokenSchema, gameSchema, orderSchema };
