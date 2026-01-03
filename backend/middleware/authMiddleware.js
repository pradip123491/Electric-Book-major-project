const jwt = require("jsonwebtoken");
const db = require("../config/db");

module.exports = (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      (req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - no token",
      });
    }

    // 🔐 Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔍 Fetch user from DB to check isActive
    db.query(
      "SELECT id, isAdmin, isActive FROM users WHERE id = ?",
      [decoded.id],
      (err, rows) => {
        if (err || rows.length === 0) {
          return res.status(401).json({
            success: false,
            message: "Unauthorized - user not found",
          });
        }

        const user = rows[0];

        // 🚫 BLOCK DISABLED USERS (IMPORTANT)
        if (user.isActive === 0) {
          return res.status(403).json({
            success: false,
            message: "Account disabled",
          });
        }

        // ✅ Attach user to request
        req.user = {
          id: user.id,
          isAdmin: user.isAdmin === 1,
          isActive: user.isActive === 1,
        };

        next();
      }
    );
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized - invalid token",
    });
  }
};
