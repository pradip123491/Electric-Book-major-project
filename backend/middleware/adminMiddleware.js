const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token =
      (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null) ||
      (req.cookies && req.cookies.token);

   

    if (!token) {
     
      return res.status(401).json({
        success: false,
        message: "Unauthorized - no token",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

   

    req.user = decoded;
    next();
  } catch (err) {
   
    return res.status(401).json({
      success: false,
      message: "Unauthorized - invalid token",
    });
  }
};
