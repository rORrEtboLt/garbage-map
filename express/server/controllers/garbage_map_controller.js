const { SUCCESS } = require("../constants/status_codes_http_constants");
const { validationResult } = require("express-validator");
const {
    errorMessageBuilder,
    successMessageBuilder,
} = require("../utilities/message_builders");
const { I18N } = require("../i18n_constants");
const { logger } = require("../utilities/logger");

/**
 * List Garbage map for Latitude Longitude
 *
 * @param {string} req.body
 * @returns {Object} Success message/failure message
 */
const listGabageMapForLatLon = (req, res) => {
    try {
        // Get all Garbage map for this particular Latitude Longitude.
        const garbageMap = [];
        // Return creation of garbage map succesfull
        return res
            .status(SUCCESS.REQUEST_COMPLETE)
            .json(
                successMessageBuilder(
                    I18N.GARBAGE_MAP_FETCH_SUCCESS,
                    SUCCESS.REQUEST_COMPLETE,
                    { garbageMap: garbageMap }
                )
            );
    } catch (error) {
        logger.error(error);
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

module.exports = {
    listGabageMapForLatLon
};

