const { MongoClient } = require("mongodb");
const mongodbUri = require("mongodb-uri");
const config = require("../config/db.json");

const { logger } = require("./logging");

const dbURL = process.env.NODE_ENV === "production" ? config.dataBaseUrl.production : config.dataBaseUrl.development;

module.exports = async function(app) {
    MongoClient.connect(dbURL, config.dataBaseOptions, async (error, client) => {
        if (error) return logger.error(`connect to mongoDB failed :${error.message}`);

        const dbInfo = mongodbUri.parse(dbURL);

        //set up the collections
        const db = client.db(dbInfo.database);
        db.users = db.collection("users");
        db.games = db.collection("games");
        db.orders = db.collection("orders");
        db.tokens = db.collection("tokens");
        db.genres = db.collection("genres");

        app.set("db", db);
        logger.info(`connect to ${dbInfo.database} mongoDB successfully`);
    });
};
