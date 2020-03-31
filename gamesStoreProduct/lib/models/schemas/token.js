const moment = require("moment");

tokenSchema = token => {
    return {
        expired: moment().format(),
        token
    };
};

module.exports = { tokenSchema };
