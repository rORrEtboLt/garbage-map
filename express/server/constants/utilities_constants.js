const ALLOW_ORIGIN = {
  ACCESS_CONTROL_ALLOW_ORIGIN: "Access-Control-Allow-Origin",
  ACCESS_CONTROL_ALLOW_METHODS: "Access-Control-Allow-Methods",
  ACCESS_CONTROL_ALLOW_HEADERS: "Access-Control-Allow-Headers",
  API_METHODS: "GET,PUT,POST,DELETE",
  HEADERS: "Content-Type, Authorization, Accept-Language",
  STAR: "*",
  OPTIONS: "OPTIONS",
};

const MONGO_ERRORS = {
  MONGO_ERROR: "MongoError",
  ONE_ONE_DOUBLE_ZERO: 11000,
};

const CREATE_TOKEN = {
  SHA256: "sha256",
  GARBAGE_MAP: "GarbageMap",
  HEX: "hex",
};

module.exports = { ALLOW_ORIGIN, MONGO_ERRORS, CREATE_TOKEN };
