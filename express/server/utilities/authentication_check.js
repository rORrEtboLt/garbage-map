const jsonWebToken = require("jsonwebtoken");
const { CLIENT_ERROR } = require("../constants/status_codes_http_constants");
const { SALT } = require("../constants/authentication_constants");
const { validateMongoId } = require("../utilities/validate_id");
const {
  errorMessageBuilder,
} = require("../utilities/message_builders");

const authenticationCheck = (req, res, next) => {
  if (!req.headers.authorization) {
    // TODO: Implement logger and log info
    return res
      .status(CLIENT_ERROR.UN_AUTHORIZED)
      .json(errorMessageBuilder("Unauthorized error."));
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(" ")[1];

  // decode the token using a secret key-phrase
  return checkTokenSalt(token, req)
    .then((decoded) => {
        // TODO: Use decoded to log email address
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
      const Identifier = decoded.Identifier;

      // If not a valid mongo id
      if(!validateMongoId){
        reject("Well Tried Better luck next time.");
      }

      // Added to recognize user.
      req.email = decoded.email;

      // check if a user exists
      const authenticatedUser = await user.findById(Identifier);

      if (authenticatedUser) {
        resolve();
      } else {
        reject("Well Tried Better luck next time.");
      }
    });
  });
};

module.exports = authenticationCheck;
