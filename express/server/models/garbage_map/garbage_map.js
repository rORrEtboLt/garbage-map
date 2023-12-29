const mongoose = require("mongoose");
const Joi = require('joi');
const Schema = mongoose.Schema;

// Garbage map model schema
const definition = {
  userId: Schema.Types.ObjectId, // the one who reports isnt it?
  latitude: Number,
  longitude: Number,
  pollutionType: String, // Type of pollution can be [ AIR, WATER, GARBAGE, ORGANIC, PLASTIC, MEDICAL, RECYLABLE, SOUND] 
  info: String, // Description
  imageUrl: Array, // array of image urls
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
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

const garbageMapValidationSchema = Joi.object().keys({
  userId: Joi.string().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  pollutionType: Joi.string().required(),
});

module.exports = { garbageMapModel, garbageMapsSchema, garbageMapValidationSchema };
