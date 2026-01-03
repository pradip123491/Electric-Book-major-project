const db = require("../config/db");

/* =========================
   GET ALL BOOKINGS (ADMIN)
========================= */
exports.getAllBookingsAdmin = (req, res) => {
  const sql = `
    SELECT 
      b.id,
      b.booking_date,
      b.booking_time,
      b.address,
      b.payment_mode,
      b.status,
      u.fullname AS user_name,
      e.fullname AS electrician_name
    FROM bookings b
    LEFT JOIN users u ON b.user_id = u.id
    LEFT JOIN users e ON b.electrician_id = e.id
    ORDER BY b.created_at DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Admin booking fetch error:", err);
      return res.status(500).json({ success: false });
    }

    res.json({ success: true, data: result });
  });
};

/* =========================
   UPDATE BOOKING STATUS
========================= */
exports.updateBookingStatusAdmin = (req, res) => {
  const { bookingId, status } = req.body;

  if (!["pending", "accepted", "rejected", "completed", "cancelled"].includes(status)) {
    return res.status(400).json({ success: false });
  }

  const sql = `
    UPDATE bookings
    SET status = ?
    WHERE id = ?
  `;

  db.query(sql, [status, bookingId], (err) => {
    if (err) {
      console.error("Admin update status error:", err);
      return res.status(500).json({ success: false });
    }

    res.json({ success: true });
  });
};


// GET pending booking count (Admin)
exports.getPendingBookingCount = (req, res) => {
    const sql = `
      SELECT COUNT(*) AS count
      FROM bookings
      WHERE status = 'pending'
    `;
  
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Pending booking count error:", err);
        return res.status(500).json({ success: false });
      }
  
      res.json({
        success: true,
        count: result[0].count,
      });
    });
  };
  
