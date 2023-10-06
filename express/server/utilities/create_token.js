const crypto = require("crypto");
const { CREATE_TOKEN } = require("../constants/utilities_constants");
const I18N = require("../i18n_constants/index");

const createToken = value => {
  if (value)
    return crypto
      .createHmac(CREATE_TOKEN.SHA256, value)
      .update(CREATE_TOKEN.DOUG_COFFEE)
      .digest(CREATE_TOKEN.HEX);
  else
    throw {
      message: I18N.TOKEN_ERROR_VALUE,
      description: I18N.TOKEN_VALUE_EMPTY
    };
};

module.exports = { createToken };
