const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendOtp = require('../utils/sendOtp');
// Memory me temporary users store karne ke liye
const tempUsers = {};


const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Signup and send OTP
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 min

    // Temporarily store in memory
    tempUsers[email] = {
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpires,
    };

    await sendOtp(email, otp);
    res.status(200).json({ message: "OTP sent to email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// Verify OTP
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const userData = tempUsers[email];
    if (!userData) return res.status(400).json({ message: "No OTP request found" });

    if (userData.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });

    if (userData.otpExpires < new Date())
      return res.status(400).json({ message: "OTP expired" });

    // Save to DB permanently
   // Baad me:
const newUser = new User({
  name: userData.name,
  email: userData.email,
  password: userData.password,
  verified: true, // <-- Yeh line add karo
});

    await newUser.save();

    delete tempUsers[email]; // cleanup

    res.status(200).json({ message: "Email verified and user registered" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !user.verified) {
      return res.status(400).json({ message: 'User not verified' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
res.status(200).json({ 
  token, 
  user: { 
    id: user._id, // ✅ use _id instead of id
    name: user.name,
    email: user.email 
  } });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  const ADMIN_CREDS = {
    email: "admin@gmail.com",
    password: "admin123"
  };

  try {
    // 🔍 Debug: Log incoming and expected values
    console.log("👉 Input Email:", email);
    console.log("👉 Input Password:", password);
    console.log("✅ Expected Email:", ADMIN_CREDS.email);
    console.log("✅ Expected Password:", ADMIN_CREDS.password);

    // Check for empty fields
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Email and password are required' 
      });
    }

    // 🔐 Check credentials
    if (email.trim() === ADMIN_CREDS.email && password === ADMIN_CREDS.password) {
      return res.status(200).json({ 
        success: true,
        message: 'Admin login successful',
        isAdmin: true
      });
    }

    // ❌ Incorrect login
    return res.status(401).json({
      success: false,
      message: 'Invalid admin credentials'
    });

  } catch (err) {
    console.error('Admin login error:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error during authentication'
    });
  }
};
