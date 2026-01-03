const express = require("express");
const router = express.Router();

const {
  getManageElectricians,
  updateVerificationStatus,
  deleteVerification,
} = require("../controllers/adminElectricianController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// GET all electricians
router.get(
  "/manage-electricians",
  authMiddleware,
  adminMiddleware,
  getManageElectricians
);

// UPDATE verification status
router.put(
  "/manage-electricians/:id",
  authMiddleware,
  adminMiddleware,
  updateVerificationStatus
);

// DELETE verification
router.delete(
  "/manage-electricians/:id",
  authMiddleware,
  adminMiddleware,
  deleteVerification
);

module.exports = router;
