// routes/verifyRoutes.js
const express = require("express");
const router = express.Router();
const verifyController = require("../controllers/verifyController");
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const UPLOAD_DIR = path.join(__dirname, "..", "uploads", "verification");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    // unique filename
    const ext = path.extname(file.originalname);
    const name = file.fieldname + "-" + Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, name + ext);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit per file (adjustable)
  fileFilter: (req, file, cb) => {
    // allow images and pdfs
    const allowed = /jpeg|jpg|png|gif|pdf/;
    const mimetype = allowed.test(file.mimetype);
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && ext) return cb(null, true);
    cb(new Error("Only images and pdfs are allowed"));
  }
});

// route: POST /api/verify/shop
// protect with auth middleware
router.post(
  "/shop",
  authMiddleware,
  upload.fields([
    { name: "shopPhoto", maxCount: 1 },
    { name: "idProof", maxCount: 1 },
    { name: "license", maxCount: 1 },
  ]),
  verifyController.submitShopVerification
);

module.exports = router;
