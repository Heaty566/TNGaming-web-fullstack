const Jimp = require("jimp");
const { removeFile } = require("../utils/removeFile");
const { logger } = require("../logging");

formatGameImage = (imageURL) => {
  //   const path = imageURL.split(".");
  //   console.log(path);
  Jimp.read(imageURL)
    .then((image) => {
      //   if (path[1] !== "jpg") removeFile(imageURL);
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
