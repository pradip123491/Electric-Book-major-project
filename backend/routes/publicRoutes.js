const express = require("express");
const router = express.Router();

const {
  getVerifiedElectricians,
} = require("../controllers/publicController");

router.get("/verified-electricians", getVerifiedElectricians);

module.exports = router;
