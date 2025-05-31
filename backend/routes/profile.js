const express = require('express');
const router = express.Router();
const User = require('../models/User');
const verifyToken = require('../middleware/verifyToken');

// Profile route
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password -otp -otpExpires");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
