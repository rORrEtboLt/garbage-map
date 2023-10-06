const mongoose = require("mongoose");

const validateMongoId = mongoId => {
  const ObjectId = mongoose.Types.ObjectId;
  if (ObjectId.isValid(mongoId)) {
    return true;
  }
  return false;
};

module.exports = { validateMongoId };
