const mongoose = require("mongoose");
const config = require("../../config");
const { APP } = require("../constants/app_constants");
const { logger } = require("../utilities/logger");

const connectToMongo = () => {
  mongoose
    .connect(config.DATABASE.URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
    .then(() => {
      logger.info(`${APP.MONGO_CONNECTION_SUCCESS}`);
    })
    .catch((err) => {
      logger.error(`${APP.MONGO_CONNECTION_ERROR} ${err}`);
    });
};

module.exports = {
  connectToMongo,
};
