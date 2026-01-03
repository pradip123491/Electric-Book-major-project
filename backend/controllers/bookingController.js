const db = require("../config/db");

/* =====================
   CHECK AVAILABILITY
===================== */
exports.checkAvailability = (req, res) => {
  const { electrician_id, booking_date, booking_time } = req.query;

  if (!electrician_id || !booking_date || !booking_time) {
    return res.status(400).json({ success: false });
  }

  const sql = `
    SELECT id
    FROM bookings
    WHERE electrician_id = ?
      AND booking_date = ?
      AND booking_time = ?
      AND status IN ('pending', 'accepted')
    LIMIT 1
  `;

  db.query(
    sql,
    [electrician_id, booking_date, booking_time],
    (err, rows) => {
      if (err) {
        console.error("Availability check error:", err);
        return res.status(500).json({ success: false });
      }

      res.json({
        success: true,
        available: rows.length === 0,
      });
    }
  );
};


/* =====================
   CREATE BOOKING
===================== */
exports.createBooking = (req, res) => {
  const userId = req.user.id;

  const {
    electrician_id,
    booking_date,
    booking_time,
    address,
    problem_description,
    payment_mode,
  } = req.body;

  if (!electrician_id || !booking_date || !booking_time || !address) {
    return res.status(400).json({ success: false });
  }

  /* 1️⃣ BACKEND SAFETY CHECK */
  const checkSql = `
    SELECT id
    FROM bookings
    WHERE electrician_id = ?
      AND booking_date = ?
      AND booking_time = ?
      AND status IN ('pending', 'accepted')
    LIMIT 1
  `;

  db.query(
    checkSql,
    [electrician_id, booking_date, booking_time],
    (err, rows) => {
      if (err) {
        console.error("Booking check error:", err);
        return res.status(500).json({ success: false });
      }

      if (rows.length > 0) {
        return res.status(409).json({
          success: false,
          message: "Electrician already booked for this slot",
        });
      }

      /* 2️⃣ CREATE BOOKING */
      const insertSql = `
        INSERT INTO bookings
        (
          user_id,
          electrician_id,
          booking_date,
          booking_time,
          address,
          problem_description,
          payment_mode,
          status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')
      `;

      db.query(
        insertSql,
        [
          userId,
          electrician_id,
          booking_date,
          booking_time,
          address,
          problem_description || null,
          payment_mode || "offline",
        ],
        (err) => {
          if (err) {
            console.error("Create booking error:", err);
            return res.status(500).json({ success: false });
          }

          res.json({ success: true });
        }
      );
    }
  );
};


exports.getMyBookings = (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  const sql = `
    SELECT 
      b.id,
      b.booking_date,
      b.booking_time,
      b.address,
      b.problem_description,
      b.payment_mode,
      b.status,
      u.fullname AS electrician_name,
      u.mobile AS electrician_mobile
    FROM bookings b
    LEFT JOIN users u ON b.electrician_id = u.id
    WHERE b.user_id = ?
    ORDER BY b.created_at DESC
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("🔥 MySQL Error:", err);
      return res.status(500).json({ message: "Server error" });
    }

    res.json(result);
  });
};


exports.getElectricianBookings = (req, res) => {
  const electricianId = req.user.id;

  const sql = `
    SELECT 
      b.id,
      b.booking_date,
      b.booking_time,
      b.address,
      b.problem_description,
      b.payment_mode,
      b.status,
      u.fullname AS user_name,
      u.mobile AS user_mobile
    FROM bookings b
    LEFT JOIN users u ON b.user_id = u.id
    WHERE b.electrician_id = ?
    ORDER BY b.created_at DESC
  `;

  db.query(sql, [electricianId], (err, result) => {
    if (err) {
      console.error("Electrician bookings error:", err);
      return res.status(500).json({ message: "Server error" });
    }
    res.json(result);
  });
};


exports.updateBookingStatus = (req, res) => {
  const electricianId = req.user.id;
  const { bookingId, status } = req.body;

  // Allowed transitions
  const allowedStatuses = ["accepted", "rejected", "completed"];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const sql = `
    UPDATE bookings
    SET status = ?
    WHERE id = ? AND electrician_id = ?
  `;

  db.query(sql, [status, bookingId, electricianId], (err, result) => {
    if (err) {
      console.error("Update booking error:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({ success: true });
  });
};


// GET pending booking count for electrician
exports.getElectricianPendingCount = (req, res) => {
  const electricianId = req.user.id;

  const sql = `
    SELECT COUNT(*) AS count
    FROM bookings
    WHERE electrician_id = ?
      AND status = 'pending'
  `;

  db.query(sql, [electricianId], (err, result) => {
    if (err) {
      console.error("Electrician pending count error:", err);
      return res.status(500).json({ success: false });
    }

    res.json({
      success: true,
      count: result[0].count,
    });
  });
};
