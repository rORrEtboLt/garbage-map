const { check } = require("express-validator");
const { AUTHENTICATION } = require("../constants/authentication_constants");

/**
 * sign-up validation checking email, password, password again, username
 * */
const validateSignUp = [
  check(AUTHENTICATION.EMAIL)
    .exists()
    .withMessage(AUTHENTICATION.EMAIL_DOES_NOT_EXIST)
    .isEmail()
    .withMessage(AUTHENTICATION.INVALID_EMAIL_FORMAT)
    .normalizeEmail(),
  check(AUTHENTICATION.USERNAME)
    .exists()
    .withMessage(AUTHENTICATION.USERNAME_DOES_NOT_EXIST)
    .isLength({
      min: AUTHENTICATION.USERNAME_MIN_LENGTH,
    })
    .withMessage(AUTHENTICATION.INVALID_USERNAME_FORMAT)
    .isLength({
      Max: AUTHENTICATION.USERNAME_MAX_LENGTH,
    })
    .withMessage(AUTHENTICATION.INVALID_USERNAME_FORMAT),
  check(AUTHENTICATION.PASSWORD)
    .exists()
    .withMessage(AUTHENTICATION.PASSWORD_IS_MANDATORY)
    .isLength({ min: AUTHENTICATION.PASSWORD_LENGTH })
    .withMessage(AUTHENTICATION.MINIMUM_LENGTH),
  check(AUTHENTICATION.PASSWORD_AGAIN)
    .exists()
    .withMessage(AUTHENTICATION.PASSWORD_AGAIN_IS_MANDATORY)
    .isLength({ min: AUTHENTICATION.PASSWORD_LENGTH })
    .withMessage(AUTHENTICATION.MINIMUM_LENGTH),
];

/**
 * Login validation checking email / username, password
 * */
const validateLogin = [
  check(AUTHENTICATION.EMAIL)
    .exists()
    .withMessage(AUTHENTICATION.EMAIL_OR_USERNAME_DOES_NOT_EXIST),
  check(AUTHENTICATION.PASSWORD)
    .exists()
    .withMessage(AUTHENTICATION.PASSWORD_IS_MANDATORY),
];

module.exports = {
  validateSignUp, validateLogin
};
