const pattern = {
    //customary errors
    objectId: "is invalid",
    "any.required": "is required",
    //password
    "string.matchPassword": "doesn't match password",

    //format date

    "date.base": "must be a valid date",
    //format array
    "array.base": "must be an array",
    "array.max": "must contain less than or equal to",
    "array.min": "must contain at least",
    //format boolean
    "boolean.base": "must be true or false",
    //format nmber
    "number.min": "must be larger than or equal to ",
    "number.max": "must be less than or equal to",
    "number.base": "must be a number",
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
