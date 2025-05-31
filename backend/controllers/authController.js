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
  user: { name: user.name, email: user.email, id: user._id } 
});

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
