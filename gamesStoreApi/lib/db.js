const { MongoClient } = require("mongodb");
const config = require("../config/db.json");

const { logger } = require("./logging");

const dbUrl =
  process.env.NODE_ENV === "production"
    ? config.dataBaseUrl.production
    : config.dataBaseUrl.development;

module.exports = async function() {
  try {
    const db = await MongoClient.connect(dbUrl, config.dataBaseOptions);
    logger.info(`connect to ${db.s.options.dbName} mongoDB successfully`);
  } catch (ex) {
    logger.error(`connect to mongoDB failed :${ex.message}`);
  }
};
