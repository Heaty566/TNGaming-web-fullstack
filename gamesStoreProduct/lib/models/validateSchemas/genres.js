const Joi = require("@hapi/joi");

const { formatError } = require("./validateErrorFormat");

validateGenre = genre => {
  const schema = Joi.object({
    name: Joi.string()
      .max(20)
      .min(2)
      .regex(/^[a-zA-Z ]*$/)
      .required()
      .messages({
        "string.base": formatError("Name", "string.base"),
        "string.empty": formatError("Name", "string.empty"),
        "string.min": formatError("Name", "string.min", " two characters"),
        "string.max": formatError("Name", "string.max", " twenty characters"),
        "string.pattern.base": formatError(
          "Name",
          "string.pattern.base",
          "letterOnly"
        ),
        "any.required": formatError("Name", "any.required")
      })
  });

  return schema.validate(genre);
};

module.exports = { validateGenre };
