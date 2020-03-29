const Joi = require("@hapi/joi");

const { formatError } = require("./validateErrorFormat");

validateUser = user => {
    const schema = Joi.object({
        name: Joi.string()
            .max(50)
            .min(2)
            .regex(/^[a-zA-Z ]*$/)
            .required()
            .messages({
                "string.base": formatError("Name", "string.base"),
                "string.empty": formatError("Name", "string.empty"),
                "string.min": formatError("Name", "string.min", " two characters"),
                "string.max": formatError("Name", "string.max", " 50 characters"),
                "string.pattern.base": formatError("Name", "string.pattern.base", "string.letterOnly"),
                "any.required": formatError("Name", "any.required")
            }),
        username: Joi.string()
            .max(50)
            .min(6)
            .regex(/^[a-zA-Z0-9]*$/)
            .required()
            .messages({
                "string.base": formatError("Username", "string.base"),
                "string.empty": formatError("Username", "string.empty"),
                "string.min": formatError("Username", "string.min", " six characters"),
                "string.max": formatError("Username", "string.max", " 50 characters"),
                "string.pattern.base": formatError("Username", "string.pattern.base", "string.letterAndNumber"),
                "any.required": formatError("Username", "any.required")
            }),
        email: Joi.string()
            .max(70)
            .min(6)
            .email()
            .regex(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
            .required()
            .messages({
                "string.base": formatError("Email", "string.base"),
                "string.empty": formatError("Email", "string.empty"),
                "string.min": formatError("Email", "string.min", " six characters"),
                "string.email": formatError("Email", "string.email"),
                "string.max": formatError("Email", "string.max", " 70 characters"),
                "string.pattern.base": formatError("Email", "string.pattern.base", "string.emailForm"),
                "any.required": formatError("Email", "any.required")
            }),
        password: Joi.string()
            .max(32)
            .min(8)
            .regex(/^[a-zA-Z0-9]*$/)
            .required()
            .messages({
                "string.base": formatError("Password", "string.base"),
                "string.empty": formatError("Password", "string.empty"),
                "string.min": formatError("Password", "string.min", " eight characters"),
                "string.max": formatError("Password", "string.max", " 32 characters"),
                "string.pattern.base": formatError("Password", "string.pattern.base", "string.letterAndNumber"),
                "any.required": formatError("Password", "any.required")
            }),
        phone: Joi.string()
            .regex(/^[0-9+]*$/)
            .max(14)
            .min(8)
            .required()
            .messages({
                "string.base": formatError("Phone", "string.base"),
                "string.empty": formatError("Phone", "string.empty"),
                "string.min": formatError("Phone", "string.min", " eight characters"),
                "string.max": formatError("Phone", "string.max", " fourteen characters"),
                "string.pattern.base": formatError("Phone", "string.pattern.base", "string.numberOnly"),
                "any.required": formatError("Phone", "any.required")
            }),
        address: Joi.string()
            .regex(/^[a-zA-Z0-9 ]*$/)
            .max(70)
            .min(1)
            .required()
            .messages({
                "string.base": formatError("Address", "string.base"),
                "string.empty": formatError("Address", "string.empty"),
                "string.min": formatError("Address", "string.min", " one character"),
                "string.max": formatError("Address", "string.max", " 70 characters"),
                "string.pattern.base": formatError("Address", "string.pattern.base", "string.letterAndNumber"),
                "any.required": formatError("Address", "any.required")
            }),
        isDeveloper: Joi.boolean().messages({
            "boolean.base": formatError("isDeveloper", "boolean.base")
        })
    });

    return schema.validate(user);
};

validateLoginUser = user => {
    const schema = Joi.object({
        username: Joi.string()
            .max(50)
            .min(6)
            .regex(/^[a-zA-Z0-9]*$/)
            .required()
            .messages({
                "string.base": formatError("Username", "string.base"),
                "string.empty": formatError("Username", "string.empty"),
                "string.min": formatError("Username", "string.min", " six characters"),
                "string.max": formatError("Username", "string.max", " 50 characters"),
                "string.pattern.base": formatError("Username", "string.pattern.base", "string.letterAndNumber"),
                "any.required": formatError("Username", "any.required")
            }),

        password: Joi.string()
            .max(32)
            .min(8)
            .regex(/^[a-zA-Z0-9]*$/)
            .required()
            .messages({
                "string.base": formatError("Password", "string.base"),
                "string.empty": formatError("Password", "string.empty"),
                "string.min": formatError("Password", "string.min", " eight characters"),
                "string.max": formatError("Password", "string.max", " 32 characters"),
                "string.pattern.base": formatError("Password", "string.pattern.base", "string.letterAndNumber"),
                "any.required": formatError("Password", "any.required")
            })
    });

    return schema.validate(user);
};

module.exports = { validateUser, validateLoginUser };
