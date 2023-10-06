const express = require("express");
const { signUp, login } = require("../controllers/authentication_controller");
const { validateSignUp, validateLogin } = require("../validators/authentication_validator");
const { SERVER_ERROR } = require("../constants/status_codes_http_constants");
const { AUTHENTICATION_ROUTES } = require("../constants/routes_constants");
const { errorMessageBuilder } = require("../utilities/message_builders");

const router = new express.Router();

/**
 * /sign-up handles onboarding of a user with his email, username and password
 */
router.post(AUTHENTICATION_ROUTES.SIGN_UP, validateSignUp, (req, res) => {
  try {
    signUp(req, res);
  } catch (err) {
    // TODO: Log errors into log error handlers once created
    return res
      .status(SERVER_ERROR.INTERNAL_SERVER_ERROR)
      .json(errorMessageBuilder);
  }
});

/**
 * /login handles entry to the app email/username and password
 */
router.post(AUTHENTICATION_ROUTES.LOGIN, validateLogin, (req, res) => {
  try {
    login(req, res);
  } catch (err) {
    console.log(err)
    // TODO: Log errors into log error handlers once created
    return res
      .status(SERVER_ERROR.INTERNAL_SERVER_ERROR)
      .json(errorMessageBuilder);
  }
});

module.exports = router;
