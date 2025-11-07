const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* ===============================================
   ✅ REGISTER NEW USER
================================================= */
exports.register = async (req, res) => {
  try {
    const { fullname, mobile, email, password, location } = req.body;

    // Validation
    if (!fullname || !mobile || !email || !password || !location) {
      console.warn("⚠️ Missing registration fields:", req.body);
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check existing user
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
      if (err) {
        console.error("❌ DB Error (SELECT):", err.message);
        return res.status(500).json({ message: "Database error. Please try again later." });
      }

      if (results.length > 0) {
        console.log(`⚠️ Registration blocked: Email already exists (${email})`);
        return res.status(400).json({ message: "Email already registered." });
      }

      try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user in DB
        db.query(
          "INSERT INTO users (fullname, mobile, email, password, location, isAdmin) VALUES (?, ?, ?, ?, ?, ?)",
          [fullname, mobile, email, hashedPassword, location, 0],
          (err) => {
            if (err) {
              console.error("❌ DB Error (INSERT):", err.message);
              return res.status(500).json({ message: "Failed to save user." });
            }

            console.log(`✅ User Registered: ${fullname} (${email})`);
            res.status(201).json({ message: "Registration successful!" });
          }
        );
      } catch (hashErr) {
        console.error("❌ Password hashing error:", hashErr.message);
        res.status(500).json({ message: "Server error during password encryption." });
      }
    });
  } catch (error) {
    console.error("🔥 Unexpected Register Error:", error.message);
    res.status(500).json({ message: "Unexpected server error." });
  }
};

/* ===============================================
   ✅ LOGIN USER / ADMIN
================================================= */
exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    console.warn("⚠️ Missing login fields:", req.body);
    return res.status(400).json({ message: "Email and password are required." });
  }

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) {
      console.error("❌ DB Error (SELECT):", err.message);
      return res.status(500).json({ message: "Database error. Please try again later." });
    }

    if (results.length === 0) {
      console.warn(`⚠️ Login failed: No account found for ${email}`);
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.warn(`⚠️ Login failed: Incorrect password for ${email}`);
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    console.log(`✅ Login Success: ${email} | Role: ${user.isAdmin ? "Admin" : "User"}`);

    res.json({
      success: true,
      message: "Login successful!",
      token,
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        location: user.location,
        isAdmin: user.isAdmin,
      },
    });
  });
};
