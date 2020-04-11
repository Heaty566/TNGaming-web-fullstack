const multer = require("multer");
const mkdirp = require("mkdirp");
const path = require("path");

const config = require("../../../config/user.json");

const avatarFilter = (req, file, cb) => {
    const acceptTypes = [".jpeg", ".jpg", ".png", ".bmp"];
    const mineType = path.extname(file.originalname).toLocaleLowerCase();

    if (acceptTypes.includes(mineType)) {
        cb(null, true);
    } else {
        cb("This file must be an image", false);
    }
};

const storage = multer.diskStorage({
    destination: async function(req, file, callback) {
        const dest = config.uploadURL.uploadAvatarUrl + "/" + req.user._id + "/avatar";

        mkdirp.sync(dest, null);
        callback(null, dest);
    },
    filename: function(req, file, callback) {
        const newFileName = `${req.user._id}-${file.fieldname}-${Date.now()}${path.extname(file.originalname).toLocaleLowerCase()}`;

        callback(null, newFileName);
    }
});

const uploadAvatar = multer({
    storage,
    fileFilter: avatarFilter,
    limits: { fileSize: 1024 * 1024 }
}).single("avatar");

module.exports = { uploadAvatar };
