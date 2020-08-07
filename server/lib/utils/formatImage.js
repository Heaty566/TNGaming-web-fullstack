const Jimp = require("jimp");
const { removeFile } = require("../utils/removeFile");
const { logger } = require("../logging");

formatGameImage = (imageURL) => {
  Jimp.read(imageURL)
    .then((image) => {
      image.quality(40).write(imageURL);
    })
    .catch(() => {
      logger.error("Format image failed");
    });

  return imageURL;
};

formatAvatar = (imageURL) => {
  const path = imageURL.split(".");
  Jimp.read(imageURL)
    .then(async (image) => {
      if (path[path.length - 1] !== "jpg") removeFile(imageURL);
      await image.resize(256, Jimp.AUTO).write(path[0] + ".jpg");
    })
    .catch(() => {
      logger.error("Format image failed");
    });

  return path[0] + ".jpg";
};

module.exports = { formatGameImage, formatAvatar };
