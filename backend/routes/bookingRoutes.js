const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  checkAvailability,
  createBooking,
  getMyBookings,
  getElectricianBookings,
  updateBookingStatus,
  getElectricianPendingCount,
} = require("../controllers/bookingController");

/* =====================
   PUBLIC ROUTES
===================== */

// Check electrician availability
router.get("/check-availability", checkAvailability);

/* =====================
   USER ROUTES (Protected)
===================== */

// Get logged-in user's bookings
router.get("/my", authMiddleware, getMyBookings);
// Electrician - get incoming booking requests
router.get(
  "/electrician/requests",
  authMiddleware,
  getElectricianBookings
);
// Electrician pending booking count
router.get(
  "/electrician/pending-count",
  authMiddleware,
  getElectricianPendingCount
);

// Electrician - update booking status
router.put(
  "/electrician/update-status",
  authMiddleware,
  updateBookingStatus
);

// Create booking
router.post("/create", authMiddleware, createBooking);

module.exports = router;
