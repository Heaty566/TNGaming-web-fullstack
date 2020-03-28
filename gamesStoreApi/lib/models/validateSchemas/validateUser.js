const Joi = require("@hapi/joi");

const { formatError } = require("./validateErrorFormat");

validateUser = user => {
    const schema = Joi.object({
        name: Joi.string()
            .max(50)
            .min(2)
            .regex(/^[a-zA-Z]*$/)
            .trim()
            .required()
            .messages({
                "string.base": formatError("Name", "string.base"),
                "string.empty": formatError("Name", "string.empty"),
                "string.min": formatError("Name", "string.min", " two characters"),
                "string.max": formatError("Name", "string.max", " fifty characters"),
                "string.pattern.base": formatError("Name", "string.pattern.base", "letterOnly"),
                "any.required": formatError("Name", "any.required")
            })
    });

    return schema.validate(user);
};

module.exports = { validateUser };
