const { MongoClient } = require("mongodb");
const mongodbUri = require("mongodb-uri");
const config = require("../config/db.json");

const { logger } = require("./logging");

const dbUrl =
  process.env.NODE_ENV === "production"
    ? config.dataBaseUrl.production
    : config.dataBaseUrl.development;

module.exports = async function(app) {
  MongoClient.connect(dbUrl, config.dataBaseOptions, async (error, client) => {
    if (error)
      return logger.error(`connect to mongoDB failed :${error.message}`);

    const dbInfo = mongodbUri.parse(dbUrl);

    //set up the collections
    const db = client.db(dbInfo.database);
    db.users = db.collection("users");
    db.games = db.collection("games");
    db.genres = await db.collection("genres");

    app.set("db", db);

    logger.info(`connect to ${dbInfo.database} mongoDB successfully`);
  });
};
