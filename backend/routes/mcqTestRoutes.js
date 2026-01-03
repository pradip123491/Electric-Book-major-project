const express = require("express");
const router = express.Router();
const mcqTestController = require("../controllers/mcqTestController");
const authMiddleware = require("../middleware/authMiddleware");

// Protected submit route
router.post("/submit", authMiddleware, mcqTestController.submitTest);

module.exports = router;
