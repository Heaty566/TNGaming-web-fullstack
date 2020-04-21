const Joi = require("@hapi/joi");

const { formatError } = require("./validateErrorFormat");

const schemasTagValidate = (type) => {
    switch (type) {
        case "name":
            return Joi.string()
                .max(20)
                .min(2)
                .regex(/^[a-zA-Z ]*$/)
                .required()
                .messages({
                    "string.base": formatError("Name", "string.base"),
                    "string.empty": formatError("Name", "string.empty"),
                    "string.min": formatError("Name", "string.min", " two characters"),
                    "string.max": formatError("Name", "string.max", " twenty characters"),
                    "string.pattern.base": formatError("Name", "string.pattern.base", "string.letterOnly"),
                    "any.required": formatError("Name", "any.required"),
                });
        default:
            break;
    }
};

export default {
    validateTag: (tag) => {
        const schema = Joi.object({
            name: schemasTagValidate("name"),
        });

        return schema.validate(tag);
    },
};
