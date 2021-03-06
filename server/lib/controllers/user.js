const bcrypt = require("bcrypt");
const ObjectId = require("mongodb").ObjectID;
const { formatAvatar } = require("../utils/formatImage");
const _ = require("lodash");

const { uploadAvatar } = require("../utils/uploadImage");
const { removeFile } = require("../utils/removeFile");

const { usersValidator } = require("../models/validateSchemas");
const { logger } = require("../logging");
const { isUser } = require("../middlewares");
const { userSchema } = require("../models/schemas");

exports.get_me = [
  isUser,
  async (req, res) => {
    const db = req.app.get("db");

    //get user from database
    const user = await db.users.findOne({
      _id: ObjectId(req.user._id),
    });

    res.json({
      success: true,
      data: user,
    });
  },
];

exports.add_balance = [
  isUser,
  async (req, res) => {
    //{balance: Number}
    const db = req.app.get("db");

    //validate balance
    const { error } = usersValidator.validateAddBalance(
      _.pick(req.body, ["balance"])
    );
    if (error)
      return res.status(400).json({
        success: false,
        msg: error.details[0].message,
      });

    //get user from database
    const user = await db.users.findOne({
      _id: ObjectId(req.user._id),
    });
    if (!user)
      return res.status(404).json({
        success: false,
        msg: "User with the given Id was not found",
      });

    //update user
    user.balance = Number(user.balance) + Number(req.body.balance);

    //update new password
    const updateUser = await db.users.updateOne(
      {
        _id: ObjectId(req.user._id),
      },
      {
        $set: {
          balance: user.balance,
        },
      }
    );
    if (!updateUser) {
      logger.error("Error adding balance");
      return res.status(400).json({
        success: false,
        msg: "adding balance failed",
      });
    }

    res.json({
      success: true,
      msg: "Added balance",
    });
  },
];

exports.register = async (req, res) => {
  //{name: "String", username: "String", email: "String", password: "String", confirm: "String", phone: "String", address: "String"}
  const db = req.app.get("db");

  //validate user

  const { error: isUser } = usersValidator.validateUser(
    _.pick(req.body, [
      "name",
      "username",
      "password",
      "confirm",
      "email",
      "phone",
      "address",
    ])
  );
  if (isUser)
    return res.status(400).json({
      success: false,
      msg: isUser.details[0].message,
    });

  //create new user
  const user = userSchema(
    _.pick(req.body, [
      "name",
      "username",
      "password",
      "email",
      "phone",
      "address",
    ])
  );

  //checking user is unique
  const isUnique = await db.users.findOne({
    username: user.username,
  });
  if (isUnique)
    return res.status(400).json({
      success: false,
      msg: "Username is taken",
    });

  //hashing password
  const salt = await bcrypt.genSalt(13);
  user.password = await bcrypt.hash(user.password, salt);

  //inserting new into database

  try {
    const newUser = await db.users.insertOne(user);
    const newUserId = newUser.insertedId;

    logger.info(`Inserted a new user with ID: ${newUserId}`);
    res.json({
      success: true,
    });
  } catch (ex) {
    logger.error("Error inserting User");
    res.status(400).json({
      success: false,
      msg: "Error inserting user",
    });
  }
};

exports.change_password = [
  isUser,
  async (req, res) => {
    //{confirm: "String", password: "String", "oldPassword": "String"}
    const db = req.app.get("db");

    const { error } = usersValidator.validateUpdatePassword(
      _.pick(req.body, ["confirm", "password", "oldPassword"])
    );
    if (error)
      return res.status(400).json({
        success: false,
        msg: error.details[0].message,
      });

    //get user from database
    const user = await db.users.findOne({
      _id: ObjectId(req.user._id),
    });
    if (!user)
      return res.status(404).json({
        success: false,
        msg: "User with the given Id was not found",
      });

    //checking is correct password
    const isCorrect = await bcrypt.compare(req.body.oldPassword, user.password);
    if (!isCorrect)
      return res.status(400).json({
        success: false,
        msg: "Old password doesn't match",
      });

    //hashing new password
    const salt = await bcrypt.genSalt(6);
    user.password = await bcrypt.hash(req.body.password, salt);

    //update new password
    const updateUser = await db.users.updateOne(
      {
        _id: ObjectId(req.user._id),
      },
      {
        $set: {
          password: user.password,
        },
      }
    );
    if (!updateUser) {
      logger.error("Error updating password");
      return res.status(400).json({
        success: false,
        msg: "Update password failed",
      });
    }

    res.json({
      success: true,
      msg: "Updated password",
    });
  },
];

exports.update_profile = [
  isUser,
  async (req, res) => {
    //{name: String, email: Email, phone: String, address: String}
    const db = req.app.get("db");

    //validate profile
    const { error } = usersValidator.validateUpdateProfile(
      _.pick(req.body, ["name", "email", "phone", "address"])
    );
    if (error)
      return res.status(400).json({
        success: false,
        msg: error.details[0].message,
      });

    //get user from database
    const user = await db.users.findOne({
      _id: ObjectId(req.user._id),
    });
    if (!user)
      return res.status(404).json({
        success: false,
        msg: "User with the given Id was not found",
      });

    //update user
    user.name = req.body.name;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.address = req.body.address;

    //update new password
    const updateUser = await db.users.updateOne(
      {
        _id: ObjectId(req.user._id),
      },
      {
        $set: user,
      }
    );
    if (!updateUser) {
      logger.error("Error updating profile");
      return res.status(400).json({
        success: false,
        msg: "Update profile failed",
      });
    }

    res.json({
      success: true,
      msg: "Updated profile",
    });
  },
];

exports.update_avatar = [
  isUser,
  (req, res) => {
    //{avatar: Image}
    const db = req.app.get("db");
    uploadAvatar(req, res, async (error) => {
      if (error) {
        if (error.code === "LIMIT_FILE_SIZE")
          return res.status(400).json({
            success: false,
            msg: "This file must be smaller or equal 1mb",
          });
        return res.status(400).json({
          success: false,
          msg: error,
        });
      }

      if (!req.files.length)
        return res
          .status(400)
          .json({ success: false, msg: "Images is required" });

      const user = await db.users.findOne({
        _id: ObjectId(req.user._id),
      });
      if (!user)
        return res.status(404).json({
          success: false,
          msg: "User with the given Id was not found",
        });
      if (user.avatar) removeFile("./public" + user.avatar);

      user.avatar = formatAvatar(req.file.path).replace("public", "");

      const image = await db.users.updateOne(
        {
          _id: ObjectId(req.user._id),
        },
        {
          $set: {
            avatar: user.avatar,
          },
        }
      );
      if (!image)
        return res.status(400).json({
          success: false,
          msg: "Updating user failed",
        });

      res.json({
        success: true,
        msg: "Updated avatar",
      });
    });
  },
];
