const { check } = require("express-validator");

/**
 * Validate garbagemap api if Latitude Longitude Exists.
 * */
const validateGarbageMap = [
  check(ACCOUNT.ACCOUNT_NAME)
    .exists()
    .withMessage(ACCOUNT.ACCOUNT_NAME_DOES_NOT_EXIST),
  check(ACCOUNT.ACCOUNT_NUMBER)
    .exists()
    .withMessage(ACCOUNT.ACCOUNT_NUMBER_DOES_NOT_EXIST),
    check(ACCOUNT.ACCOUNT_CODE)
    .exists()
    .withMessage(ACCOUNT.ACCOUNT_CODE_DOES_NOT_EXIST),
];

module.exports = {
    validateGarbageMap,
};
