const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const { formatError } = require("../validateSchemas/validateErrorFormat");
const { validateGenre } = require("./genres");
const { validateUser, validateLoginUser, validateUpdatePassword } = require("./users");

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

module.exports = { validateGenre, validateUser, validateLoginUser, validateUpdatePassword, isObjectId };
