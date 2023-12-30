const express = require("express");
const router = new express.Router();
const {
  listGabageMapForLatLon,
  addGabageMapForLatLon
} = require("../controllers/garbage_map_controller");

// /garbage-map/:lat/:log Adding garbage map data into the system
router.get("/garbage-map/:lat/:lon", (req, res) => {
  listGabageMapForLatLon(req, res);
});

// /garbage-map/:lat/:log Adding garbage map data into the system
router.post("/garbage-map", (req, res) => {
  addGabageMapForLatLon(req, res);
});

module.exports = router;
