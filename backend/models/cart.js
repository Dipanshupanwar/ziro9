// models/Cart.js
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true, // har user ka ek hi cart hoga
  },
  items: [
    {
      productId: String,
      quantity: Number,
      name: String,         // optional
      price: Number,        // optional
      image: String         // optional
    },
  ],
});

module.exports = mongoose.model("Cart", cartSchema);
