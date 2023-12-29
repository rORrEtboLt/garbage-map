const { SUCCESS, VALIDATION } = require("../constants/status_codes_http_constants");
const { garbageMapModel, garbageMapValidationSchema } = require("../models/garbage_map/garbage_map");
const {
    errorMessageBuilder,
    successMessageBuilder,
} = require("../utilities/message_builders");
const Joi = require('joi');
const { I18N } = require("../i18n_constants");
const { logger } = require("../utilities/logger");

/**
 * List Garbage map for Latitude Longitude
 *
 * @param {string} req.body
 * @returns {Object} Success message/failure message
 */
const listGabageMapForLatLon = async (req, res) => {
    try {
        // Get all Garbage map for this particular Latitude Longitude.
        const garbageMap = await garbageMapModel.find();
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

/**
 * Add Garbage map for Latitude Longitude
 *
 * @param {string} req.body
 * @returns {Object} Success message/failure message
 */
const addGabageMapForLatLon = async (req, res) => {
    try {
        // Validate the request
        const result = garbageMapValidationSchema.validate(req.body);
        const { value, error } = result;
        const valid = error == null;
        if (!valid) {
            logger.error(error);
            return  res.status(VALIDATION.ERROR).json({
                message: I18N.ADD_GARBAGE_MAP_VALIDATION_ERROR,
                error: error,
                data: body
            })
        } else {
            // Add all the info of a garbage map into the database
            let garbageMapData = req.body;
            garbageMapData.userId = req.user.userId;
            const garbageMap = new garbageMapModel(garbageMapData);
            const garbageMapAdded = await garbageMap.save();
            return res
            .status(SUCCESS.REQUEST_COMPLETE)
            .json(
                successMessageBuilder(
                    I18N.GARBAGE_MAP_ADD_SUCCESS,
                    SUCCESS.REQUEST_COMPLETE,
                    { garbageMap: garbageMapAdded }
                )
            );
        }       
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
    listGabageMapForLatLon,
    addGabageMapForLatLon
};

