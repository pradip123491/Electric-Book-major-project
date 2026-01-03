const db = require("../config/db");
const bcrypt = require("bcryptjs");

/* =====================
   GET MY PROFILE
===================== */
exports.getMyProfile = (req, res) => {
  db.query(
    "SELECT id, fullname, email, mobile, location, profile_image FROM users WHERE id=?",
    [req.user.id],
    (err, rows) => {
      if (err || !rows.length) {
        return res.status(500).json({ success: false });
      }
      res.json({ success: true, data: rows[0] });
    }
  );
};

/* =====================
   UPDATE MY PROFILE
===================== */
exports.updateMyProfile = (req, res) => {
  const { fullname, mobile, location } = req.body;

  let imageSql = "";
  let params = [fullname, mobile, location];

  if (req.file) {
    imageSql = ", profile_image=?";
    params.push(`/uploads/profile/${req.file.filename}`);
  }

  params.push(req.user.id);

  db.query(
    `UPDATE users SET fullname=?, mobile=?, location=? ${imageSql} WHERE id=?`,
    params,
    (err) => {
      if (err) {
        return res.status(500).json({ success: false });
      }
      res.json({ success: true });
    }
  );
};

/* =====================
   CHANGE PASSWORD
===================== */
exports.changePassword = (req, res) => {
  const { oldPassword, newPassword } = req.body || {};

  if (!oldPassword || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Missing password fields",
    });
  }

  db.query(
    "SELECT password FROM users WHERE id=?",
    [req.user.id],
    async (err, rows) => {
      if (!rows.length) {
        return res.status(400).json({ success: false });
      }

      const match = await bcrypt.compare(oldPassword, rows[0].password);
      if (!match) {
        return res.status(400).json({
          success: false,
          message: "Old password incorrect",
        });
      }

      const hashed = await bcrypt.hash(newPassword, 10);

      db.query(
        "UPDATE users SET password=? WHERE id=?",
        [hashed, req.user.id],
        () => res.json({ success: true })
      );
    }
  );
};



/* =====================
   GET VERIFICATION STATUS
===================== */
exports.getVerificationStatus = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT status
    FROM shop_verifications
    WHERE user_id = ?
    ORDER BY created_at DESC
    LIMIT 1
  `;

  db.query(sql, [userId], (err, rows) => {
    if (err) {
      console.error("Verification status error:", err);
      return res.status(500).json({ success: false });
    }

    // No record → user never applied OR record deleted
    if (rows.length === 0) {
      return res.json({
        success: true,
        status: "not_given",
      });
    }

    return res.json({
      success: true,
      status: rows[0].status, // pending | approved | rejected
    });
  });
};


exports.getUserDashboardStats = (req, res) => {
  const userId = req.user.id;
  const stats = {};

  const bookingSql = `
    SELECT COUNT(*) AS count
    FROM bookings
    WHERE user_id = ?
  `;

  const electricianSql = `
    SELECT COUNT(DISTINCT sv.user_id) AS count
    FROM shop_verifications sv
    WHERE sv.status = 'approved'
  `;

  const profileSql = `
    SELECT fullname, email, mobile, location, profile_image
    FROM users
    WHERE id = ?
  `;

  db.query(bookingSql, [userId], (err, bookingResult) => {
    if (err) return res.status(500).json({ success: false });

    stats.yourBookings = bookingResult[0].count;

    db.query(electricianSql, (err, elecResult) => {
      if (err) return res.status(500).json({ success: false });

      stats.availableElectricians = elecResult[0].count;

      db.query(profileSql, [userId], (err, profileResult) => {
        if (err) return res.status(500).json({ success: false });

        const profile = profileResult[0];

        // ✅ ALL PROFILE FIELDS (INCLUDING PHOTO)
        const fields = [
          "fullname",
          "email",
          "mobile",
          "location",
          "profile_image",
        ];

        const filled = fields.filter((field) => {
          const value = profile[field];
          return value && value.toString().trim() !== "";
        }).length;

        stats.profileCompletion = Math.round(
          (filled / fields.length) * 100
        );

        res.json({
          success: true,
          data: stats,
        });
      });
    });
  });
};
