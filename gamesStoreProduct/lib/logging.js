const { format, transports, createLogger, exceptions } = require("winston");
const {
  combine,
  colorize,
  timestamp,
  splat,
  printf,
  label,
  prettyPrint,
} = format;

myFormat = printf((info) => {
  return `${info.timestamp} ${info.label} ${info.level}: ${info.message}`;
});

logger = createLogger({
  transports: [
    //CONSOLE LOGGER
    new transports.Console({
      format: combine(
        colorize(),
        label({ label: "[server-log]" }),
        timestamp(),
        splat(),
        myFormat
      ),
    }),

    //FILE LOGER
    new transports.File({
      filename: "info.log",
      format: combine(timestamp(), prettyPrint()),
    }),
  ],
});

function exceptionsLogger() {
  process.on("unhandledRejection", (ex) => {
    throw ex;
  });

  exceptions.handle(
    new transports.Console({
      format: combine(colorize(), timestamp()),
    }),
    new transports.File({ filename: "uncaughtExceptions.log" })
  );
}

module.exports = { exceptionsLogger, logger };
