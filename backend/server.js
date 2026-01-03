const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");

// ================= ROUTES =================
const authRoutes = require("./routes/authRoutes");
const mcqRoutes = require("./routes/mcqRoutes");
const mcqTestRoutes = require("./routes/mcqTestRoutes");
const verifyRoutes = require("./routes/verifyRoutes");
const adminElectricianRoutes = require("./routes/adminElectricianRoutes");
const adminUserRoutes = require("./routes/adminUserRoutes");
const userRoutes = require("./routes/userRoutes");
const contactRoutes = require("./routes/contactRoutes");
const adminContactRoutes = require("./routes/adminContactRoutes");
const publicRoutes = require("./routes/publicRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const adminBookingRoutes = require("./routes/adminBookingRoutes");
// ================= CONFIG =================
dotenv.config();
const app = express();

/* ================= CORS ================= */
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

/* ================= BODY PARSERS =================
   🔑 THIS MUST COME BEFORE ROUTES
   - JSON for change password, login, etc.
   - Multer will handle multipart inside routes
=============================================== */
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* ================= STATIC FILES ================= */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ================= ROUTES ================= */

// Auth (JSON)
app.use("/api/auth", authRoutes);

// User (JSON + Multer inside userRoutes)
app.use("/api/user", userRoutes);

// Shop verification (Multer inside verifyRoutes)
app.use("/api/verify", verifyRoutes);

//public electrician 
app.use("/api/public", publicRoutes);

// MCQ
app.use("/api/mcq", mcqRoutes);
app.use("/api/mcqtest", mcqTestRoutes);


app.use("/api/bookings", bookingRoutes);

// Admin
app.use("/api/admin", adminElectricianRoutes);
app.use("/api/admin", adminUserRoutes);

app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminContactRoutes);
app.use("/api/admin", adminBookingRoutes);

/* ================= ROOT ================= */
app.get("/", (req, res) => {
  res.json({
    message: "⚡ Electrician Book API running",
    status: "OK",
  });
});

/* ================= GLOBAL ERROR HANDLER ================= */
app.use((err, req, res, next) => {
  console.error("🔥 Global Error:", err);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend server running on port ${PORT}`);
  console.log(`🌍 Frontend URL: ${process.env.FRONTEND_URL}`);
});
