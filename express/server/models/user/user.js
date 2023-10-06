const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// User model schema
const definition = {
  email: {
    type: String,
    index: { unique: true },
    required: true,
  },
  password: {
    type: String,
  },
  username: {
    type: String,
  },
  status: {
    type: String,
    enum: ["ACTIVE", "INACTIVE", "BLOCKED"],
    default: "ACTIVE",
  },
  hash: {
    type: String,
  },
  previlages: [
    {
      type: String,
      enum: ["ALL"],
      default: "ALL",
      required: true,
    },
  ],
  loginUnsuccessful: {
    type: Number,
    default: 0,
  },
  userBlockedTill: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  lastPasswordReset: Date,
  verifySignupToken: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
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
  collection: "users",
};

// User schema
const userSchema = new Schema(definition, options);

// User model creation
const userModel = mongoose.model("users", userSchema);

module.exports = { userModel, userSchema };
