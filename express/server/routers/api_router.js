const express = require("express");
const router = new express.Router();
const {
  listGabageMapForLatLon
} = require("../controllers/garbage_map_controller");

// /garbage-map/:lat/:log Adding account personal data into the system
router.post("/garbage-map/:lat/:log", (req, res) => {
  listGabageMapForLatLon(req, res);
});

module.exports = router;
