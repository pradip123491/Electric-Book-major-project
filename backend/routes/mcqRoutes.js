const express = require("express");
const router = express.Router();
const mcqController = require("../controllers/mcqController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// ADMIN
router.get("/all", authMiddleware, adminMiddleware, mcqController.getAllMCQ);
router.post("/add", authMiddleware, adminMiddleware, mcqController.addMCQ);
router.put("/update/:id", authMiddleware, adminMiddleware, mcqController.updateMCQ);
router.delete("/delete/:id", authMiddleware, adminMiddleware, mcqController.deleteMCQ);

// USER
router.get("/random", authMiddleware, mcqController.getRandom);

// MUST BE LAST
router.get("/:id", authMiddleware, mcqController.getSingleMCQ);

module.exports = router;
