const winston = require("winston");
const config = require("../../config");
const { LOGGER } = require("../constants/logger_constants");

const logger = winston.createLogger({
  level: LOGGER.INFO,
  format: winston.format.json(),
  defaultMeta: {
    service: LOGGER.DEFAULT_SERVICE,
    time: new Date().toUTCString(),
  },
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({
      filename: config.LOG.ERROR_FILE,
      level: LOGGER.INFO,
    }),
    new winston.transports.File({ filename: config.LOG.COMBINED_FILE }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== LOGGER.PRODUCTION) {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

module.exports = {
  logger,
};
