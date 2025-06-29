
// middleware/auth.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // make sure token was signed with { id: user._id }
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};



// authMiddleware.js
exports.verifyUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

exports.verifyAdmin = (req, res, next) => {
  const isAdmin = req.headers['admin-auth'] === 'true';
  if (!isAdmin) return res.status(403).json({ message: "Admin access required" });
  next();
};