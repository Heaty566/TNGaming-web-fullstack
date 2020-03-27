const express = require("express");
const app = express();

const { logger, exceptionsLogger } = require("./lib/logging");

require("./lib/db")();
require("./lib/routes")(app);
require("./lib/prod")(app);
exceptionsLogger();

const port = process.env.PORT || 4000;

app.listen(port, () => logger.info(`Listening on port ${port}`));
