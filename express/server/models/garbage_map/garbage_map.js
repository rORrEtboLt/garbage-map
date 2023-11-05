const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Garbage map model schema
const definition = {
  reporter: Object,
  userId: Schema.Types.ObjectId,
  latitude: Number,
  longitude: Number,
  pollutionType: String,
  info: String,
  imageUrl: Array,
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
  collection: "garbage_map",
};

// Garbage map Schema 
const garbageMapsSchema = new Schema(definition, options);

// Garbage map model creation
const garbageMapModel = mongoose.model("garbageMaps", garbageMapsSchema);

module.exports = { garbageMapModel, garbageMapsSchema };
