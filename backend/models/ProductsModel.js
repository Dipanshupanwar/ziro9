const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  originalPrice: { type: Number },  // Optional for perfumes
  price: { type: Number, required: true },
  mainImage: { type: String, required: true },
  hoverImage: { type: String },

  // Category of the product
  category: {
    type: String,
    enum: ['clothes', 'perfume', 'summer'],
    required: true,
  },

  // Optional fields depending on category
  Fabric: { type: String, default: '' },
  Print: { type: String, default: '' },
  Iron: { type: String, default: '' },
  WashCare: { type: String, default: '' },
  discount: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
