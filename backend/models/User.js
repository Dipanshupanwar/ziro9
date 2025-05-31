const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  name: String,
  password: String,
  verified: { type: Boolean, default: false },
  otp: String,
  otpExpires: Date,
});

module.exports = mongoose.model('ZirUser', userSchema);
