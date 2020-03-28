const pattern = {
  //customary errors
  objectId: "is invalid",

  "any.required": "is required",
  //format String
  letterOnly: " letters only",
  "string.base": "must be a string",
  "string.empty": "is not allowed to be empty",
  "string.pattern.base": "must contain",
  "string.min": "must contain at least",
  "string.max": "must be less than or equal to"
};

formatError = (label, type, option = "") => {
  return `${label} ${pattern[type]}${
    pattern[option] ? pattern[option] : option
  }`;
};

module.exports = { formatError };
