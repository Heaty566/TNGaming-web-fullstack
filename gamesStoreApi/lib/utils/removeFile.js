const rimraf = require("rimraf");
const { logger } = require("../logging");

removeFile = (fileURL) => {
    rimraf(fileURL, (err) => {
        if (err) logger.error("Error Deleting avatar folder");
    });
};

removeArray = (arr) => {
    arr.map((item) => {
        rimraf(item, (err) => {
            if (err) logger.error("Error Deleting avatar folder");
        });
    });
};

module.exports = { removeFile, removeArray };
