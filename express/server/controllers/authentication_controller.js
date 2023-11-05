const { validationResult } = require("express-validator");
const { userModel } = require("../models/user/user");
const { userSessionModel } = require("../models/user/user_session");
const { SUCCESS } = require("../constants/status_codes_http_constants");
const { sendSignUpMail } = require("../utilities/send_e_mail");
const bcrypt = require("bcrypt");
const {
  errorMessageBuilder,
  successMessageBuilder,
} = require("../utilities/message_builders");
const { createToken } = require("../utilities/create_token");
const { isMongoDuplicate } = require("../utilities/mongo_errors");
const { I18N } = require("../i18n_constants");
const { AUTHENTICATION, SALT } = require("../constants/authentication_constants");
const jwt = require("jsonwebtoken");

/**
 * Sign-up to Garbage Map with email, username, password and password again
 *
 * @param {string} req.body.email
 * @param {string} req.body.username
 * @param {string} req.body.password
 * @param {string} req.body.passwordAgain
 * @returns {Object} Success message/failure message
 */
const signUp = (req, res) => {
  try {
    // Validate if signup details exist in proper format.
    const errors = validationResult(req);

    // if validation errors throw appropriate error message
    if (!errors.isEmpty()) {
      throw {
        status: SUCCESS.REQUEST_COMPLETE,
        message: errors.errors[0].msg,
        description: errors,
      };
    }

    // if password and password again do not match throw password mismatch error.
    if (req.body.password !== req.body.passwordAgain) {
      throw {
        status: SUCCESS.REQUEST_COMPLETE,
        message: I18N.PASSWORD_MISMATCH,
        description: I18N.PASSWORD_MISMATCH,
      };
    }

    // Generating password hash using bcrypt
    const salt = bcrypt.genSaltSync(AUTHENTICATION.SALT_ROUNDS);
    const passwordHash = bcrypt.hashSync(req.body.password, salt);

    // Create a signup token to send it to their email address
    const verifySignupToken = createToken(req.body.email);

    // Create the user data object to save to DB
    const userData = {
      email: req.body.email.trim().toLowerCase(),
      password: passwordHash,
      verifySignupToken: verifySignupToken,
      created: Date.now(),
    };

    // Save user data to database
    const newUser = new userModel(userData);
    newUser
      .save()
      .then(() => {
        // Send mail to the user with what template and data required
        const mailSent = sendSignUpMail(req.body.email, verifySignupToken);

        // Handling no mail sent errors
        if (!mailSent) {
          throw {
            status: SUCCESS.REQUEST_COMPLETE,
            message: error,
            description: I18N.MAIL_NOT_SENT,
          };
        }

        // Return creation of account succesful
        return res
          .status(SUCCESS.REQUEST_COMPLETE)
          .json(successMessageBuilder(I18N.SIGNUP_SUCCESS_MESSAGE));
      })
      .catch((error) => {
        // Handling email address already exist.
        if (isMongoDuplicate(error, AUTHENTICATION.EMAIL)) {
          return res
            .status(SUCCESS.REQUEST_COMPLETE)
            .json(
              errorMessageBuilder(
                I18N.EMAIL_ALREADY_EXIST,
                SUCCESS.REQUEST_COMPLETE,
                I18N.EMAIL_ALREADY_EXIST
              )
            );
        }
        // else return server error
        else {
          return res
            .status(SUCCESS.REQUEST_COMPLETE)
            .json(
              errorMessageBuilder(
                I18N.SERVER_ERROR,
                SUCCESS.REQUEST_COMPLETE,
                I18N.SERVER_ERROR
              )
            );
        }
      });
  } catch (error) {
    return res
      .status(error.status || SUCCESS.REQUEST_COMPLETE)
      .json(
        errorMessageBuilder(
          error.message || I18N.SERVER_ERROR,
          error.status || SUCCESS.REQUEST_COMPLETE,
          error.description || I18N.SERVER_ERROR
        )
      );
  }
};

/**
 * Login to Garbage Map with email or username, password
 *
 * @param {string} req.body.email
 * @param {string} req.body.password
 * @returns {Object} Success object with JWT token
 */
const login = (req, res) => {
  try {
    // Validate if login details exist in proper format.
    const errors = validationResult(req);

    // if validation errors throw appropriate error message
    if (!errors.isEmpty()) {
      throw {
        status: SUCCESS.REQUEST_COMPLETE,
        message: errors.errors[0].msg,
        description: errors,
      };
    }

    // check if username or email exists in the database
    userModel
      .findOne({
        $or: [{ email: req.body.email }, { username: req.body.email }],
      })
      .then(async (user) => {
        if (user) {
          // Compare password
          const isValidPassword = bcrypt.compareSync(
            req.body.password,
            user.password
          );
          if (isValidPassword) {
            // Generate jwt token and save to the document and return
            const token = jwt.sign(
              { user: req.body.email, username: user.username, iat: Date.now() }, SALT._,
              { expiresIn: AUTHENTICATION.EXPIRES_IN }
            );

            // Update user session with token
            // TODO: 1. On logout delete this token
            // TODO: 2. On Login next time remove all older expired token
            // TODO: 3. On login with new token remove all old tokens ?
            const session = new userSessionModel({
              userId: user._id,
              sessionToken: token,
              user: user,
            })
            await session.save();

            // Return success with token
            return res
              .status(SUCCESS.REQUEST_COMPLETE)
              .json(
                successMessageBuilder(
                  I18N.LOGIN_SUCCESS_MESSAGE,
                  SUCCESS.REQUEST_COMPLETE,
                  { token: token }
                )
              );
          } else {
            throw {
              status: SUCCESS.REQUEST_COMPLETE,
              message: I18N.INCORRECT_PASSWORD,
              description: I18N.INCORRECT_PASSWORD,
            };
          }
        } else {
          // Return user does not exist.
          throw {
            status: SUCCESS.REQUEST_COMPLETE,
            message: I18N.USER_DOESNOT_EXIST,
            description: I18N.PLEASE_CHECK_USERNAME_EMAIL,
          };
        }
      })
      .catch((error) => {
        console.log(error)
        // Handling email address already exist.
        if (isMongoDuplicate(error, AUTHENTICATION.EMAIL)) {
          return res
            .status(SUCCESS.REQUEST_COMPLETE)
            .json(
              errorMessageBuilder(
                I18N.EMAIL_ALREADY_EXIST,
                SUCCESS.REQUEST_COMPLETE,
                I18N.EMAIL_ALREADY_EXIST
              )
            );
        }
        // else return server error
        else {
          return res
            .status(SUCCESS.REQUEST_COMPLETE)
            .json(
              errorMessageBuilder(
                error.message,
                SUCCESS.REQUEST_COMPLETE,
                error.description
              )
            );
        }
      });
  } catch (error) {
    return res
      .status(error.status || SUCCESS.REQUEST_COMPLETE)
      .json(
        errorMessageBuilder(
          error.message || I18N.SERVER_ERROR,
          error.status || SUCCESS.REQUEST_COMPLETE,
          error.description || I18N.SERVER_ERROR
        )
      );
  }
};

module.exports = { signUp, login };
