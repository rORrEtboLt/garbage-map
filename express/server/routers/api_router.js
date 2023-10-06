const express = require("express")
const router = new express.Router();
const {
  errorMessageBuilder,
} = require("../utilities/message_builders");

// /login handles login with username, password return json web token
router.post("/api", (req, res) => {
  try {
    return res.send({ server: "Hello API" });
  } catch (err) {
    console.log(err)
    // TODO: Log errors into log error handlers once created
    return res
      .status(SERVER_ERROR.INTERNAL_SERVER_ERROR)
      .json(errorMessageBuilder());
  }
});

module.exports = router;
