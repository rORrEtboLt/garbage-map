const mongoose = require("mongoose");
const Joi = require('joi');
const Schema = mongoose.Schema;

// Garbage map model schema
const definition = {
  userId: Schema.Types.ObjectId,
  location: {
    type: { type: String },
    coordinates: [Number],
    accuracy: Number,
    altitude: Number,
    altitudeAccuracy: Number,
    heading: Number,
    speed: Number
  },
  country: String,
  city: String,
  address: String,
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

garbageMapsSchema.index({ location: '2dsphere' });

// Garbage map model creation
const garbageMapModel = mongoose.model("garbageMaps", garbageMapsSchema);

const garbageMapValidationSchema = Joi.object().keys({
  userId: Joi.string().required(),
  location: Joi.object().keys({
    type: Joi.string(),
    coordinates: Joi.array().required(),
  }).required(),
  pollutionType: Joi.string().required(),
});

module.exports = { garbageMapModel, garbageMapsSchema, garbageMapValidationSchema };
