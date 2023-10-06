const {
  SERVER_ERROR,
  SUCCESS,
} = require("../constants/status_codes_http_constants");

/**
 * Error message builder
 * by default sends internal server error
 * accepts message errCode description and returns a proper error object
 *
 * @param {string} message
 * @param {Number} errorCode
 * @param {string} description
 * @returns {object} {
    success: false,
    message: message || "Internal server error.",
    code: errorCode || SERVER_ERROR.INTERNAL_SERVER_ERROR,
    description: description || "Internal server error."
  }
 */
const errorMessageBuilder = (message, errorCode, description) => {
  let errorMessage = {
    success: false,
    message: message || "Internal server error.",
    code: errorCode || SERVER_ERROR.INTERNAL_SERVER_ERROR,
    description: description || "Internal server error.",
  };

  return errorMessage;
};

/**
 * Success message builder
 * by default sends request complete
 * accepts message successCode data and returns a proper success object
 *
 * @param {string} message
 * @param {Number} successCode
 * @param {Object} data
 * @returns {Object} {
    success: true,
    message: message || "Request Successfull.",
    code: successCode || SUCCESS.REQUEST_COMPLETE,
    data: data || {},
  }
 */
const successMessageBuilder = (message, successCode, data) => {
  let successMessage = {
    success: true,
    message: message || "Request Successfull.",
    code: successCode || SUCCESS.REQUEST_COMPLETE,
    data: data || {},
  };

  return successMessage;
};

module.exports = { errorMessageBuilder, successMessageBuilder };
