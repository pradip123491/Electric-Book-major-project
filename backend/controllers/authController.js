const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* ===============================================
   REGISTER USER
================================================= */
exports.register = async (req, res) => {
  try {
    const { fullname, mobile, email, password, location } = req.body;

    if (!fullname || !mobile || !email || !password || !location) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    db.query(
      "SELECT id FROM users WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Database error.",
          });
        }

        if (results.length > 0) {
          return res.status(400).json({
            success: false,
            message: "Email already registered.",
          });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
          `
          INSERT INTO users 
          (fullname, mobile, email, password, location, isAdmin)
          VALUES (?, ?, ?, ?, ?, ?)
          `,
          [fullname, mobile, email, hashedPassword, location, 0],
          (err2) => {
            if (err2) {
              return res.status(500).json({
                success: false,
                message: "Failed to register user.",
              });
            }

            return res.status(201).json({
              success: true,
              message: "Registration successful!",
            });
          }
        );
      }
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unexpected server error.",
    });
  }
};

/* ===============================================
   LOGIN USER / ADMIN
================================================= */
exports.login = (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Database error.",
          });
        }

        if (results.length === 0) {
          return res.status(400).json({
            success: false,
            message: "Invalid credentials.",
          });
        }

        const user = results[0];

        // 🚫 BLOCK DISABLED USERS (IMPORTANT)
        if (user.isActive === 0) {
          return res.status(403).json({
            success: false,
            message: "Your account has been disabled. Please contact admin.",
          });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res.status(400).json({
            success: false,
            message: "Invalid credentials.",
          });
        }

        // 🔐 JWT PAYLOAD
        const token = jwt.sign(
          {
            id: user.id,
            isAdmin: user.isAdmin === 1,
          },
          process.env.JWT_SECRET,
          { expiresIn: "2h" }
        );

        // 🍪 Cookie
        res.cookie("token", token, {
          httpOnly: true,
          secure: false, // true in production
          sameSite: "lax",
          maxAge: 2 * 60 * 60 * 1000,
        });

        return res.json({
          success: true,
          message: "Login successful!",
          token,
          user: {
            id: user.id,
            fullname: user.fullname,
            email: user.email,
            location: user.location,
            isAdmin: user.isAdmin === 1,
            isActive: user.isActive === 1, // ✅ send status
          },
        });
      }
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unexpected server error.",
    });
  }
};
