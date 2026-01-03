const db = require("../config/db");

/**
 * GET /api/admin/manage-electricians
 */
const getManageElectricians = (req, res) => {
  const sql = `
    SELECT 
      sv.id AS verification_id,
      sv.status AS verification_status,
      sv.shop_name,
      sv.shop_address,
      sv.shop_city,
      sv.shop_mobile,
      sv.shop_photo,
      sv.id_proof,
      sv.license_file,
      sv.created_at,

      u.id AS user_id,
      u.fullname AS name,
      u.email,

      r.id AS result_id,
      r.total,
      r.correct,
      r.wrong,
      r.percentage

    FROM shop_verifications sv
    LEFT JOIN users u ON sv.user_id = u.id
    LEFT JOIN mcq_results r 
      ON r.user_id = sv.user_id
     AND r.id = (
        SELECT id FROM mcq_results 
        WHERE user_id = sv.user_id
        ORDER BY created_at DESC
        LIMIT 1
     )
    ORDER BY sv.created_at DESC
  `;

  db.query(sql, (err, rows) => {
    if (err) {
      console.error("Manage electrician error:", err);
      return res.status(500).json({ success: false });
    }
    res.json({ success: true, data: rows });
  });
};

/**
 * PUT /api/admin/manage-electricians/:id
 */
const updateVerificationStatus = (req, res) => {
  const { id } = req.params;
  const { status, admin_note } = req.body;

  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({ success: false });
  }

  const sql = `
    UPDATE shop_verifications
    SET status = ?, admin_note = ?
    WHERE id = ?
  `;

  db.query(sql, [status, admin_note || null, id], (err) => {
    if (err) {
      console.error("Update verification error:", err);
      return res.status(500).json({ success: false });
    }
    res.json({ success: true });
  });
};



const deleteVerification = (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM shop_verifications WHERE id = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Delete verification error:", err);
      return res.status(500).json({ success: false });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false });
    }

    res.json({ success: true });
  });
};

module.exports = {
  getManageElectricians,
  updateVerificationStatus,
  deleteVerification,
};