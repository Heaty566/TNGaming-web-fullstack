const Joi = require("@hapi/joi");

const { formatError } = require("./validateErrorFormat");

const schemasPlatformValidate = (type) => {
  switch (type) {
    case "name":
      return Joi.string()
        .max(20)
        .min(2)
        .regex(/^[a-zA-Z0-9]*$/)
        .required()
        .messages({
          "string.base": formatError("Name", "string.base"),
          "string.empty": formatError("Name", "string.empty"),
          "string.min": formatError("Name", "string.min", " two characters"),
          "string.max": formatError("Name", "string.max", " twenty characters"),
          "string.pattern.base": formatError(
            "Name",
            "string.pattern.base",
            "string.letterOnly"
          ),
          "any.required": formatError("Name", "any.required"),
        });
    default:
      break;
  }
};

module.exports = {
  validatePlatform: (platform) => {
    const schema = Joi.object({
      name: schemasPlatformValidate("name"),
    });

    return schema.validate(platform);
  },
};
