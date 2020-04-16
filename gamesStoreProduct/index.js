process.env.NODE_ENV = "production";
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const express = require("express");
const app = express();

const { logger, exceptionsLogger } = require("./lib/logging");

require("./lib/db")(app);
require("./lib/prod")(app);
require("./lib/routes")(app);
exceptionsLogger();

const port = process.env.PORT || 4000;

app.listen(port, () => logger.info(`Listening on port ${port}`));
