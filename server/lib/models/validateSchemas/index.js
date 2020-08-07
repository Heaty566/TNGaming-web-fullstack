const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const gamesValidator = require("./game");
const tagsValidator = require("./tag");
const usersValidator = require("./user");
const platformsValidator = require("./platform");

isObjectId = (label, _id) => {
    const schema = Joi.object({
        _id: Joi.objectId()
            .required()
            .messages({
                "any.required": formatError(label, "any.required"),
                "string.pattern.name": formatError(label, "objectId"),
            }),
    });

    return schema.validate({ _id });
};

module.exports = { gamesValidator, tagsValidator, usersValidator, platformsValidator, isObjectId };
