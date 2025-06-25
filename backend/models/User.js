const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  productType: {
    type: String, // 'Perfume', 'summercollection', 'InitialProduct', etc.
    required: true
  },
  quantity: Number,
  size: String
});


const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  name: String,
  password: String,
  verified: { type: Boolean, default: false },
  otp: String,
  otpExpires: Date,
  cart: [cartItemSchema],
});

const User = mongoose.model('ZirUser', userSchema);
module.exports = User; // ✅ CommonJS export
