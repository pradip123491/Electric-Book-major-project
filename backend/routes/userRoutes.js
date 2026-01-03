const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");

const {
  getMyProfile,
  getUserDashboardStats,
  updateMyProfile,
  changePassword,
  getVerificationStatus,
} = require("../controllers/userController");

/* =====================
   MULTER CONFIG
===================== */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profile");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* =====================
   ROUTES
===================== */
router.get("/me", authMiddleware, getMyProfile);
router.get(
  "/dashboard-stats",
  authMiddleware,
  getUserDashboardStats
);

router.put(
  "/me",
  authMiddleware,
  upload.single("profile_image"), // ✅ IMPORTANT
  updateMyProfile
);

router.put(
  "/change-password",
  authMiddleware,
  changePassword
);

router.get(
  "/verification-status",
  authMiddleware,
  getVerificationStatus
);


module.exports = router;
