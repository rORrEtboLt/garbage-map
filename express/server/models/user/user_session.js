const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// User model schema
const definition = {
  user: Object,
  userId: Schema.Types.ObjectId,
  sessionToken: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAT: {
    type: Date,
    default: Date.now(),
  },
};

const options = {
  collection: "user_sessions",
};

// User Sessions Schema 
const userSessionsSchema = new Schema(definition, options);

// User model creation
const userSessionModel = mongoose.model("userSessions", userSessionsSchema);

module.exports = { userSessionModel, userSessionsSchema };
