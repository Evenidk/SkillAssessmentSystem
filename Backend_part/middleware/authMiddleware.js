// middleware/authMiddleware.js

const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "No token provided, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decoded.userId };  // Attach userId to req.user
    next();
  } catch (error) {
    console.error("Token verification error:", error);  // Add error logging
    res.status(401).json({ error: "Token is not valid" });
  }
};
