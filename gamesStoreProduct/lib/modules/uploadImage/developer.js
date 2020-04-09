const multer = require("multer");
const mkdirp = require("mkdirp");
const path = require("path");

const config = require("../../../config/user.json");

const imagesGameFilter = (req, file, cb) => {
    const acceptTypes = [".jpeg", ".jpg", ".png", ".bmp"];
    const mineType = path.extname(file.originalname).toLocaleLowerCase();

    if (acceptTypes.includes(mineType)) {
        cb(null, true);
    } else {
        cb("This file must be an image", false);
    }
};

const storageGameImages = multer.diskStorage({
    destination: async function(req, file, callback) {
        const dest = `${config.uploadURL.uploadImagesGameUrl}/${req.user._id}/games/${req.developer.unique}`;
        mkdirp.sync(dest, null);
        callback(null, dest);
    },
    filename: function(req, file, callback) {
        const newFileName = `${req.developer.unique}-${file.fieldname}-${Date.now()}${path.extname(file.originalname).toLocaleLowerCase()}`;

        callback(null, newFileName);
    }
});

const uploadImageGame = multer({
    storage: storageGameImages,
    fileFilter: imagesGameFilter,
    limits: { fileSize: 2 * 1024 * 1024 }
}).array("imagesGame", 10);

module.exports = { uploadImageGame };
