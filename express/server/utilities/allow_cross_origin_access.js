const { ALLOW_ORIGIN } = require("../constants/utilities_constants");
const { SUCCESS } = require("../constants/status_codes_http_constants");

const allowCrossOriginAccess = (req, res, next) => {
  // Allow all cross origin requests
  res.header(ALLOW_ORIGIN.ACCESS_CONTROL_ALLOW_ORIGIN, ALLOW_ORIGIN.STAR);

  // Allow all get put post and delete methods
  res.header(
    ALLOW_ORIGIN.ACCESS_CONTROL_ALLOW_METHODS,
    ALLOW_ORIGIN.API_METHODS
  );

  // Allow headers with these strings
  res.header(ALLOW_ORIGIN.ACCESS_CONTROL_ALLOW_HEADERS, ALLOW_ORIGIN.HEADERS);

  // Intercept Options method send 200 success
  if (req.method == ALLOW_ORIGIN.OPTIONS) {
    res.sendStatus(SUCCESS.REQUEST_OK);
  } else {
    next();
  }
};

module.exports = { allowCrossOriginAccess };
