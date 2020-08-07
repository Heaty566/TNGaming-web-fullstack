const multer = require("multer");
const mkdirp = require("mkdirp");
const path = require("path");

const config = require("../../../config/user.json");

const sliceShowFilter = (req, file, cb) => {
    const acceptTypes = [".jpeg", ".jpg", ".png", ".bmp"];
    const mineType = path.extname(file.originalname).toLocaleLowerCase();

    if (acceptTypes.includes(mineType)) {
        cb(null, true);
    } else {
        cb("This file must be an image", false);
    }
};

const storage = multer.diskStorage({
    destination: async function (req, file, callback) {
        const dest = config.uploadURL.uploadSliceShowURL;

        mkdirp.sync(dest, null);
        callback(null, dest);
    },
    filename: function (req, file, callback) {
        const newFileName = `sliceshow-${
            file.fieldname
        }-${Date.now()}${path.extname(file.originalname).toLocaleLowerCase()}`;

        callback(null, newFileName);
    },
});

const uploadSliceShow = multer({
    storage,
    fileFilter: sliceShowFilter,
    limits: { fileSize: 2 * 1024 * 1024 },
}).single("slicesShow");

module.exports = { uploadSliceShow };
