// controllers/verifyController.js
const db = require("../config/db");
const fs = require("fs");
const path = require("path");

const UPLOAD_DIR = path.join(__dirname, "..", "uploads", "verification");

// ensure upload dir exists
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

/**
 * POST /api/verify/shop
 * multipart/form-data expected:
 * fields: shopName, shopAddress, shopCity, shopMobile, gstNumber
 * files: shopPhoto, idProof, license
 * Auth: uses authMiddleware (req.user should exist)
 */
exports.submitShopVerification = (req, res) => {
  try {
    const userId = req.user ? req.user.id : null;
    const {
      shopName,
      shopAddress,
      shopCity,
      shopMobile,
      gstNumber
    } = req.body;

    // Basic validation
    if (!shopName || !shopAddress || !shopMobile) {
      return res.status(400).json({ success: false, message: "Missing required fields." });
    }

    // files (multer sets req.files)
    const shopPhoto = req.files && req.files.shopPhoto ? req.files.shopPhoto[0].filename : null;
    const idProof = req.files && req.files.idProof ? req.files.idProof[0].filename : null;
    const licenseFile = req.files && req.files.license ? req.files.license[0].filename : null;

    // Save DB record
    const sql = `
      INSERT INTO shop_verifications
      (user_id, shop_name, shop_address, shop_city, shop_mobile, gst_number, shop_photo, id_proof, license_file, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
      userId,
      shopName,
      shopAddress,
      shopCity || null,
      shopMobile,
      gstNumber || null,
      shopPhoto ? `/uploads/verification/${shopPhoto}` : null,
      idProof ? `/uploads/verification/${idProof}` : null,
      licenseFile ? `/uploads/verification/${licenseFile}` : null,
      "pending"
    ], (err, result) => {
      if (err) {
        console.error("DB error saving shop verification:", err);
        return res.status(500).json({ success: false, message: "DB error saving verification." });
      }

      return res.json({
        success: true,
        message: "Verification submitted successfully.",
        verificationId: result.insertId
      });
    });
  } catch (err) {
    console.error("submitShopVerification error:", err);
    return res.status(500).json({ success: false, message: "Unexpected server error" });
  }
};
