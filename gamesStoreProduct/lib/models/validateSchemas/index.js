const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const { formatError } = require("../validateSchemas/validateErrorFormat");
const { validateGenre } = require("./genres");
const { validateGameNew, validateGameRestock, validateGameUpdate } = require("./games");
const { validateUser, validateLoginUser, validateUpdatePassword, validateUpdateProfile, validateAddBalance } = require("./users");

isObjectId = (label, _id) => {
    const schema = Joi.object({
        _id: Joi.objectId()
            .required()
            .messages({
                "any.required": formatError(label, "any.required"),
                "string.pattern.name": formatError(label, "objectId")
            })
    });

    return schema.validate({ _id });
};

module.exports = {
    validateGenre,
    validateUser,
    validateLoginUser,
    validateUpdatePassword,
    validateUpdateProfile,
    validateAddBalance,
    validateGameNew,
    validateGameUpdate,
    validateGameRestock,
    isObjectId
};
