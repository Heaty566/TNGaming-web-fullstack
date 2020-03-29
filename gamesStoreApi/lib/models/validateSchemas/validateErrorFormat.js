const pattern = {
    //customary errors
    objectId: "is invalid",

    "any.required": "is required",

    //format boolean
    "boolean.base": "must be true or false",

    //format String
    "string.emailForm": " an email",
    "string.letterOnly": " letters only",
    "string.numberOnly": " numbers only",
    "string.email": "must be a valid email",
    "string.letterAndNumber": " letters and numbers only",
    "string.base": "must be a string",
    "string.empty": "is not allowed to be empty",
    "string.pattern.base": "must contain",
    "string.min": "must contain at least",
    "string.max": "must be less than or equal to"
};

formatError = (label, type, option = "") => {
    return `${label} ${pattern[type]}${pattern[option] ? pattern[option] : option}`;
};

module.exports = { formatError };
