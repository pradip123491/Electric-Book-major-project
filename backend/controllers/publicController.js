const db = require("../config/db");

/* =====================
   GET VERIFIED ELECTRICIANS (PUBLIC)
===================== */
exports.getVerifiedElectricians = (req, res) => {
  const sql = `
    SELECT 
      u.id AS electrician_id,
      u.fullname,
      u.mobile,
      u.location,
      u.profile_image,
      sv.shop_name,
      sv.shop_city
    FROM users u
    INNER JOIN shop_verifications sv 
      ON sv.user_id = u.id
    WHERE sv.status = 'approved'
    ORDER BY sv.created_at DESC
  `;

  db.query(sql, (err, rows) => {
    if (err) {
      console.error("Get verified electricians error:", err);
      return res.status(500).json({ success: false });
    }

    res.json({
      success: true,
      data: rows,
    });
  });
};
