const { MONGO_ERRORS } = require("../constants/utilities_constants");

const isMongoDuplicate = (error, key) => {
  return error.name === MONGO_ERRORS.MONGO_ERROR &&
    error.code === MONGO_ERRORS.ONE_ONE_DOUBLE_ZERO &&
    error.keyPattern[key]
    ? true
    : false;
};

module.exports = { isMongoDuplicate };
