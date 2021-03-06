const ObjectId = require("mongodb").ObjectID;
const rimraf = require("rimraf");
const _ = require("lodash");

const { logger } = require("../logging");
const { removeFile } = require("../utils/removeFile");
const { formatGameImage } = require("../utils/formatImage");
const { uploadImageGame } = require("../utils/uploadImage");
const { isUser, isDeveloper } = require("../middlewares");
const { gameSchema } = require("../models/schemas");
const { isObjectId, gamesValidator } = require("../models/validateSchemas");

exports.update_game = [
  isUser,
  isDeveloper,
  async (req, res) => {
    const db = req.app.get("db");

    const { error: isId } = isObjectId("Game", req.params.id);
    if (isId)
      return res
        .status(400)
        .json({ success: false, msg: isId.details[0].message });

    const { error: isGame } = gamesValidator.validateGameUpdate(
      _.pick(req.body, [
        "name",
        "price",
        "tagId",
        "platformId",
        "description",
        "available",
        "stock",
        "date",
        "publisher",
      ])
    );
    if (isGame)
      return res
        .status(400)
        .json({ success: false, msg: isGame.details[0].message });

    const game = await db.games.findOne({ _id: ObjectId(req.params.id) });
    if (!game)
      return res.status(404).json({
        success: false,
        msg: "Game with the given Id was not found",
      });

    if (game.developerId != req.user._id)
      return res.status(403).json({ success: false, msg: "Forbidden" });

    const uniqueTags = req.body.tagId.filter(
      (value, index, array) => array.indexOf(value) === index
    );
    const uniquePlatforms = req.body.platformId.filter(
      (value, index, array) => array.indexOf(value) === index
    );

    Promise.all(
      uniqueTags.map(async (item) => {
        const tag = await db.tags.findOne({
          _id: ObjectId(item),
        });

        if (!tag)
          return Promise.reject({
            success: false,
            msg: "Tag with the given Id was not found",
          });
      }),
      uniquePlatforms.map(async (item) => {
        const platform = await db.tags.findOne({
          _id: ObjectId(item),
        });

        if (!platform)
          return Promise.reject({
            success: false,
            msg: "Tag with the given Id was not found",
          });
      })
    ).then(async () => {
      game.name = req.body.name;
      game.tagId = req.body.tagId;
      game.platformId = req.body.platformId;
      game.description = req.body.description;
      game.price = req.body.price;
      game.available = req.body.available;

      const updateGame = await db.games.updateOne(
        { _id: ObjectId(req.params.id) },
        { $set: game }
      );
      if (!updateGame) {
        logger.error("Error restock game");
        return res
          .status(400)
          .json({ success: false, msg: "Updating game failed" });
      }

      logger.info(`Updated game with the Id: ${game._id}`);
      res.json({ success: true, msg: `Game has been updated` });
    });
  },
];

exports.restock_game = [
  isUser,
  isDeveloper,
  async (req, res) => {
    const db = req.app.get("db");

    const { error: isId } = isObjectId("Game", req.params.id);
    if (isId)
      return res
        .status(400)
        .json({ success: false, msg: isId.details[0].message });

    const { error: isRestock } = gamesValidator.validateGameRestock(
      req.body.stock
    );
    if (isRestock)
      return res
        .status(400)
        .json({ success: false, msg: isRestock.details[0].message });

    const game = await db.games.findOne({ _id: ObjectId(req.params.id) });
    if (!game)
      return res.status(404).json({
        success: false,
        msg: "Game with the given Id was not found",
      });

    if (game.developerId != req.user._id)
      return res.status(403).json({ success: false, msg: "Forbidden" });
    game.stock = Number(game.stock) + Number(req.body.stock);

    const updateGame = await db.games.updateOne(
      { _id: ObjectId(req.params.id) },
      { $set: { stock: game.stock } }
    );
    if (!updateGame) {
      logger.error("Error restock game");
      return res
        .status(400)
        .json({ success: false, msg: "Updating game failed" });
    }

    res.json({
      success: true,
      msg: `Game has been added more ${req.body.stock}`,
    });
  },
];

exports.add_new_game = [
  isUser,
  isDeveloper,
  async (req, res) => {
    //{name: String, price: Number, tagId: tag,  decription: String, available: boolean, stock: number, imagesGame: Image limits 10}
    const db = req.app.get("db");
    uploadImageGame(req, res, async (error) => {
      if (error) {
        if (error.code === "LIMIT_FILE_SIZE")
          return res.status(400).json({
            success: false,
            msg: "This file must be smaller or equal 2mb",
          });
        return res.status(400).json({ success: false, msg: error });
      }

      if (!req.files.length)
        return res
          .status(400)
          .json({ success: false, msg: "Images is required" });
      const images = req.files.map((file) => {
        return formatGameImage(file.path).replace("public", "");
      });
      //validate game
      const { error: isGame } = gamesValidator.validateGameNew(
        _.pick(req.body, [
          "name",
          "price",
          "tagId",
          "platformId",
          "description",
          "available",
          "stock",
          "date",
          "publisher",
        ])
      );
      if (isGame) {
        removeFile(req.imageDestination);
        return res
          .status(400)
          .json({ success: false, msg: isGame.details[0].message });
      }
      //find user from database
      const user = await db.users.findOne({
        _id: ObjectId(req.user._id),
      });
      if (!user) {
        removeFile(req.imageDestination);
        return res.status(404).json({
          success: false,
          msg: "User with the given Id was not found",
        });
      }
      //format before inserting
      const game = gameSchema(
        _.pick(req.body, [
          "name",
          "price",
          "tagId",
          "description",
          "available",
          "stock",
          "date",
          "publisher",
        ])
      );

      const uniqueTags = req.body.tagId.filter(
        (value, index, array) => array.indexOf(value) === index
      );

      const uniquePlatforms = req.body.platformId.filter(
        (value, index, array) => array.indexOf(value) === index
      );

      Promise.all(
        uniqueTags.map(async (item) => {
          const tag = await db.tags.findOne({
            _id: ObjectId(item),
          });
          if (!tag)
            return Promise.reject({
              success: false,
              msg: "Tag with the given Id was not found",
            });
        }),
        uniquePlatforms.map(async (item) => {
          const platform = await db.platforms.findOne({
            _id: ObjectId(item),
          });
          if (!platform)
            return Promise.reject({
              success: false,
              msg: "Tag with the given Id was not found",
            });
        })
      )
        .then(async () => {
          game.tagId = uniqueTags;
          game.platformId = uniquePlatforms;
          game.developerId = user._id;
          game.images = images;
          try {
            const newGame = await db.games.insertOne(game);
            const gameId = newGame.insertedId;
            user.gamesDev.push(gameId);
            await db.users.updateOne(
              { _id: ObjectId(user._id) },
              { $set: user }
            );
            logger.info(`Inserted new game with Id: ${gameId}`);
            res.json({ success: true });
          } catch (ex) {
            logger.error("Error inserting games");
            removeFile(req.imageDestination);
            res.status(400).json({
              success: false,
              msg: "Error inserting game",
            });
          }
        })
        .catch((err) => {
          removeFile(req.imageDestination);
          return res.status(404).json(err);
        });
    });
  },
];

exports.delete_game = [
  isUser,
  isDeveloper,
  async (req, res) => {
    const db = req.app.get("db");

    const { error: isId } = isObjectId("Game", req.params.id);
    if (isId)
      return res
        .status(400)
        .json({ success: false, msg: isId.details[0].message });

    const game = await db.games.findOne({ _id: ObjectId(req.params.id) });
    if (!game)
      return res.status(404).json({
        success: false,
        msg: "Game with the given Id was not found",
      });

    if (game.developerId != req.user._id)
      return res.status(403).json({ success: false, msg: "Forbidden" });

    const updateGame = await db.games.deleteOne({
      _id: ObjectId(req.params.id),
    });
    if (!updateGame) {
      logger.error("Error restock game");
      return res
        .status(400)
        .json({ success: false, msg: "Deleting game failed" });
    }
    game.images.map((item) => {
      rimraf(item, (error) => {
        if (error) logger.error(`Error deleted images game`);
      });
    });

    logger.info(`Deleted game with the Id: ${game._id}`);
    res.json({ success: true, msg: `Game has been deleted` });
  },
];
