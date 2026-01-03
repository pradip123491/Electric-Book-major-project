const db = require("../config/db");

/* ===============================
   GET ALL USERS (ADMIN)
================================ */
exports.getAllUsers = (req, res) => {
  const sql = `
    SELECT 
      id,
      fullname,
      mobile,
      email,
      location,
      isAdmin,
      isActive,
      profile_image,
      created_at
    FROM users
    ORDER BY created_at DESC
  `;

  db.query(sql, (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false });
    }
    res.json({ success: true, data: rows });
  });
};


/* ===============================
   ENABLE / DISABLE USER
================================ */
exports.toggleUserStatus = (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;

  db.query(
    "UPDATE users SET isActive = ? WHERE id = ?",
    [isActive ? 1 : 0, id],
    (err) => {
      if (err) {
        return res.status(500).json({ success: false });
      }
      res.json({ success: true });
    }
  );
};

/* ===============================
   DELETE USER (HARD DELETE)
================================ */
exports.deleteUser = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM users WHERE id = ?", [id], (err) => {
    if (err) {
      return res.status(500).json({ success: false });
    }
    res.json({ success: true });
  });
};


/* =========================
   ADMIN DASHBOARD STATS
========================= */
exports.getAdminDashboardStats = (req, res) => {
  const stats = {};

  // 1️⃣ Total normal users (NOT admin)
  const userSql = `
    SELECT COUNT(*) AS count
    FROM users
    WHERE isAdmin = 0
  `;

  // 2️⃣ Approved electricians
  const electricianSql = `
    SELECT COUNT(DISTINCT user_id) AS count
    FROM shop_verifications
    WHERE status = 'approved'
  `;

  // 3️⃣ Contact messages (FIXED TABLE NAME)
  const contactSql = `
    SELECT COUNT(*) AS count
    FROM contact_messages
  `;

  // 4️⃣ Total bookings
  const bookingSql = `
    SELECT COUNT(*) AS count
    FROM bookings
  `;

  db.query(userSql, (err, u) => {
    if (err) {
      console.error("User count error:", err);
      return res.status(500).json({ success: false });
    }

    stats.totalUsers = u[0].count;

    db.query(electricianSql, (err, e) => {
      if (err) {
        console.error("Electrician count error:", err);
        return res.status(500).json({ success: false });
      }

      stats.totalElectricians = e[0].count;

      db.query(contactSql, (err, c) => {
        if (err) {
          console.error("Contact count error:", err);
          return res.status(500).json({ success: false });
        }

        stats.totalContacts = c[0].count;

        db.query(bookingSql, (err, b) => {
          if (err) {
            console.error("Booking count error:", err);
            return res.status(500).json({ success: false });
          }

          stats.totalBookings = b[0].count;

          return res.json({
            success: true,
            data: stats,
          });
        });
      });
    });
  });
};