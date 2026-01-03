const db = require("../config/db");

/* =========================
   SAVE CONTACT MESSAGE
========================= */
exports.saveContact = (req, res) => {
  const { name, mobile, email, message } = req.body;

  if (!name || !mobile || !email || !message) {
    return res.status(400).json({ success: false });
  }

  db.query(
    "INSERT INTO contact_messages (name, mobile, email, message) VALUES (?, ?, ?, ?)",
    [name, mobile, email, message],
    (err) => {
      if (err) {
        console.error("Contact save error:", err);
        return res.status(500).json({ success: false });
      }
      res.json({ success: true });
    }
  );
};

/* =========================
   ADMIN: GET ALL CONTACTS
========================= */
exports.getAllContacts = (req, res) => {
  db.query(
    "SELECT * FROM contact_messages ORDER BY created_at DESC",
    (err, rows) => {
      if (err) {
        return res.status(500).json({ success: false });
      }
      res.json({ success: true, data: rows });
    }
  );
};

/* =========================
   MARK AS READ
========================= */
exports.markRead = (req, res) => {
  const { id } = req.params;

  db.query(
    "UPDATE contact_messages SET is_read = 1 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ success: false });
      res.json({ success: true });
    }
  );
};

/* =========================
   DELETE CONTACT
========================= */
exports.deleteContact = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM contact_messages WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ success: false });
      res.json({ success: true });
    }
  );
};
