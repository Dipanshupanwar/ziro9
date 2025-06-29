const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const sendOtp = require("../utils/sendOtp"); // ✅ not sendEmail
// Nodemailer wrapper
const crypto = require("crypto");
const { signup, verifyOtp, login,adminLogin } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/verify-otp', verifyOtp);
router.post('/login', login);
router.post('/admin/login', adminLogin);
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  try {
    console.log(email);
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

 await sendOtp(email, otp); // ✅ correct function and correct format


    res.json({ message: "OTP sent to email." });
  } catch (err) {
    console.error(err); // ✅ Add this to see actual error
    res.status(500).json({ message: "Something went wrong" });
  }
});


// POST /api/auth/reset-password
router.post("/reset-password", async (req, res) => {
  const { email, otp, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.otp !== otp || Date.now() > user.otpExpiry) {
      return res.status(400).json({ message: "Invalid OTP or expired." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.json({ message: "Password reset successful." });
  } catch (err) {
    res.status(500).json({ message: "Failed to reset password" });
  }
});


module.exports = router;
