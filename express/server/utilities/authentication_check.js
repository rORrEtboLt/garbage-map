const jsonWebToken = require("jsonwebtoken");
const { CLIENT_ERROR } = require("../constants/status_codes_http_constants");
const { SALT } = require("../constants/authentication_constants");
const { userSessionModel } = require("../models/user/user_session");
const { userModel } = require("../models/user/user");
const { logger } = require("../utilities/logger");

const { errorMessageBuilder } = require("../utilities/message_builders");

const authenticationCheck = (req, res, next) => {
  if (!req.headers.authorization) {
    // TODO: Implement logger and log info
    logger.error("Unauthorized user");
    return res
      .status(CLIENT_ERROR.UN_AUTHORIZED)
      .json(errorMessageBuilder("Unauthorized error."));
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(" ")[1];

  // decode the token using a secret key-phrase
  checkTokenSalt(token, req)
    .then((decoded) => {
      // TODO: Use decoded to log email address
      // added user to req object
      req.user = {
        user: decoded.user,
        userId: decoded.userId
      };
      return next();
    })
    .catch((err) => {
      // TODO: use err to log into errors
      return res
        .status(CLIENT_ERROR.UN_AUTHORIZED)
        .json(errorMessageBuilder("Unauthorized error."));
    });
};

// check wheather its a valid token
const checkTokenSalt = (token, req) => {
  return new Promise((resolve, reject) => {
    jsonWebToken.verify(token, SALT._, async (err, decoded) => {
      if (err) {
        // TODO: Implement logger and log info
        reject(err);
      }

      // User Identifier
      const userEmail = decoded.user;

      // Added to recognize user.
      req.email = decoded.email;

      // check if a user exists
      const authenticatedUser = await userModel.findOne({ email: userEmail });
      const isUserInSession = await userSessionModel.findOne({
        sessionToken: token,
      });

      decoded.userId = authenticatedUser._id;

      if (authenticatedUser && isUserInSession) {
        resolve(decoded);
      } else if (!authenticatedUser) {
        logger.error("UnAuthenticated user");
        reject("User unauthorized");
      } else if (!isUserInSession) {
        logger.error("session Not found");
        reject("Please refresh session or session not found");
      } else {
        logger.error("User Not found");
        reject("Unauthorized Better luck next time.");
      }
    });
  });
};

module.exports = authenticationCheck;
