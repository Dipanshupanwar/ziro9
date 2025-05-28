// models/Product.js
const mongoose = require('mongoose');

const perfume = new mongoose.Schema({
  name: { type: String, required: true },
  originalPrice: { type: String },
  discountedPrice: { type: String },
  mainImage: { type: String, required: true },
  hoverImage: { type: String },
  discount: { type: String },
  Fabric: { type: String, default: '' },
  Print: { type: String, default: '' },
  Iron: { type: String, default: '' },
  WashCare: { type: String, default: '' },
}, { timestamps: true });


const perfumeModel = mongoose.model('Perfume', perfume);
const summerCollectionModel = mongoose.model('summercollection', perfume)

module.exports={
  perfumeModel,
  summerCollectionModel,
};
