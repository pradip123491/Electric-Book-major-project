const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getAllBookingsAdmin,
  updateBookingStatusAdmin,
  getPendingBookingCount,
} = require("../controllers/adminBookingController");

// Get all bookings (Admin)
router.get("/bookings", authMiddleware, getAllBookingsAdmin);
router.get(
    "/bookings/pending-count",
    authMiddleware,
    getPendingBookingCount
  );
  

// Update booking status (Admin override)
router.put("/bookings/status", authMiddleware, updateBookingStatusAdmin);

module.exports = router;
