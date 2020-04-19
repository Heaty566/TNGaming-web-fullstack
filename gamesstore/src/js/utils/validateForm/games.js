const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const { formatError } = require("./validateErrorFormat");

const schemasGamesValidate = (type) => {
    switch (type) {
        case "name":
            return Joi.string()
                .max(50)
                .min(1)
                .regex(/^[a-zA-Z0-9- ]*$/)
                .required()
                .messages({
                    "string.base": formatError("Name", "string.base"),
                    "string.empty": formatError("Name", "string.empty"),
                    "string.min": formatError("Name", "string.min", " one character"),
                    "string.max": formatError("Name", "string.max", " 50 characters"),
                    "string.pattern.base": formatError("Name", "string.pattern.base", "string.letterOnly"),
                    "any.required": formatError("Name", "any.required"),
                });

        case "price":
            return Joi.number()
                .max(5000)
                .min(0)
                .required()
                .messages({
                    "number.max": formatError("price", "number.max", " $5000"),
                    "number.min": formatError("price", "number.min", " $0"),
                    "number.base": formatError("price", "number.base"),
                    "any.required": formatError("price", "any.required"),
                });

        case "stock":
            return Joi.number()
                .max(5000)
                .min(1)
                .required()
                .messages({
                    "number.max": formatError("stock", "number.max", " 5000"),
                    "number.min": formatError("stock", "number.min", " one"),
                    "number.base": formatError("stock", "number.base"),
                    "any.required": formatError("stock", "any.required"),
                });

        case "genreId":
            return Joi.array()
                .items(Joi.objectId())
                .max(20)
                .min(1)
                .required()
                .messages({
                    "string.empty": formatError("Genre", "string.empty"),
                    "array.max": formatError("Genre", "array.max", " twenty genres"),
                    "array.min": formatError("Genre", "array.min", " one genre"),
                    "any.required": formatError("Genre", "any.required"),
                });

        case "images":
            return Joi.array()
                .max(10)
                .min(3)
                .required()
                .messages({
                    "object.max": formatError("Images", "array.max", " ten images"),
                    "object.min": formatError("Images", "array.min", " tree images"),
                    "any.required": formatError("Images", "any.required"),
                });

        case "description":
            return Joi.string()
                .allow("")
                .max(5000)
                .required()
                .messages({
                    "string.base": formatError("Description", "string.base"),
                    "string.max": formatError("Description", "string.max", " 50000 characters"),
                    "any.required": formatError("Description", "any.required"),
                });
        case "available":
            return Joi.boolean()
                .required()
                .messages({
                    "boolean.base": formatError("available", "boolean.base"),
                    "any.required": formatError("available", "any.required"),
                });
        case "publisher":
            return Joi.string()
                .max(50)
                .min(1)
                .regex(/^[a-zA-Z0-9- ]*$/)
                .required()
                .messages({
                    "string.base": formatError("publisher", "string.base"),
                    "string.empty": formatError("publisher", "string.empty"),
                    "string.min": formatError("publisher", "string.min", " one character"),
                    "string.max": formatError("publisher", "string.max", " 50 characters"),
                    "string.pattern.base": formatError(
                        "publisher",
                        "string.pattern.base",
                        "string.letterOnly"
                    ),
                    "any.required": formatError("publisher", "any.required"),
                });
        case "date":
            return Joi.date()
                .required()
                .messages({
                    "date.base": formatError("Date", "date.base"),
                    "any.required": formatError("Date", "any.required"),
                });
        default:
            break;
    }
};

export default {
    validateGameNew: (game) => {
        const schema = Joi.object({
            name: schemasGamesValidate("name"),
            price: schemasGamesValidate("price"),
            genreId: schemasGamesValidate("genreId"),
            description: schemasGamesValidate("description"),
            available: schemasGamesValidate("available"),
            stock: schemasGamesValidate("stock"),
            date: schemasGamesValidate("date"),
            publisher: schemasGamesValidate("publisher"),
            imagesGame: schemasGamesValidate("images"),
        });

        return schema.validate(game);
    },
    validateGameUpdate: (game) => {
        const schema = Joi.object({
            name: schemasGamesValidate("name"),
            price: schemasGamesValidate("price"),
            genreId: schemasGamesValidate("genreId"),
            description: schemasGamesValidate("description"),
            available: schemasGamesValidate("available"),
            date: schemasGamesValidate("date"),
            publisher: schemasGamesValidate("publisher"),
        });

        return schema.validate(game);
    },

    validateGameRestock: (stock) => {
        const schema = Joi.object({
            stock: schemasGamesValidate("stock"),
        });

        return schema.validate({
            stock,
        });
    },
};
