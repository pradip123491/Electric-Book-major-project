const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  toggleUserStatus,
  deleteUser,
  getAdminDashboardStats,
} = require("../controllers/adminUserController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  getAllUsers
);

router.get(
  "/dashboard-stats",
  authMiddleware,
  adminMiddleware,
  getAdminDashboardStats
);

router.put(
  "/users/status/:id",
  authMiddleware,
  adminMiddleware,
  toggleUserStatus
);

router.delete(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  deleteUser
);

module.exports = router;
