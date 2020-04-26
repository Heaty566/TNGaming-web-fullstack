const ObjectId = require("mongodb").ObjectID;
const _ = require("lodash");

const config = require("../../config/game.json");
const { isObjectId } = require("../models/validateSchemas");

exports.get_all_game = async (req, res) => {
  const db = req.app.get("db");
  if (req.params.page < 1) req.params.page = 1;

  const games = await db.games.find().toArray();

  const filter = _(games)
    .slice((req.params.page - 1) * config.page.pageSize)
    .take(config.page.pageSize)
    .value();

  res.json({ success: true, data: filter });
};

exports.get_game_by_id = async (req, res) => {
  const db = req.app.get("db");

  const { error: isId } = isObjectId("Game", req.params.id);
  if (isId)
    return res
      .status(400)
      .json({ success: true, msg: isId.details[0].message });

  const game = await db.games.findOne({ _id: ObjectId(req.params.id) });
  if (!game)
    return res
      .status(404)
      .json({ success: true, msg: "Game with the given Id was not found" });

  const tags = await db.tags
    .find({
      _id: { $in: game.tagId.map((item) => ObjectId(item)) },
    })
    .toArray();

  const platforms = await db.platforms
    .find({
      _id: { $in: game.platformId.map((item) => ObjectId(item)) },
    })
    .toArray();

  game.tags = tags;
  game.platforms = platforms;
  console.log(game);
  res.json({ success: true, data: game });
};

exports.game_sort_by_tag = async (req, res) => {
  const db = req.app.get("db");
  if (req.params.page < 1) req.params.page = 1;

  const tag = await db.tags.findOne({ _id: ObjectId(req.params.tagId) });
  if (!tag)
    return res
      .status(404)
      .json({ success: false, msg: "Tag with the given Id was not found" });

  const games = await db.games.find({ tagId: String(tag._id) }).toArray();
  const filter = _(games)
    .slice((req.params.page - 1) * config.page.pageSize)
    .take(config.page.pageSize)
    .value();

  res.json({ success: true, data: filter });
};

exports.game_sort_by_key = async (req, res) => {
  const db = req.app.get("db");
  if (req.params.page < 1) req.params.page = 1;

  const games = await db.games.find().toArray();

  const search = games.filter((item) =>
    item.name.toLowerCase().includes(req.params.key.toLowerCase())
  );

  const filter = _(search)
    .slice((req.params.page - 1) * config.page.pageSize)
    .take(config.page.pageSize)
    .value();

  res.json({ success: true, data: filter });
};
