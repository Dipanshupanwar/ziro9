// models/productModels.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: String,
  mainImage: String,
  hoverImage: String,
  Fabric: String,
  Print: String,
  Iron: String,
  WashCare: String,
  discount: String,
  
});

// Creating 4 collections
const InitialProduct = mongoose.model('InitialProduct', productSchema, 'initialProducts');
const AdditionalProduct = mongoose.model('AdditionalProduct', productSchema, 'additionalProducts');
const InitialProductR = mongoose.model('InitialProductR', productSchema, 'initialProductsR');
const AdditionalProductR = mongoose.model('AdditionalProductR', productSchema, 'additionalProductsR');

module.exports = {
  InitialProduct,
  AdditionalProduct,
  InitialProductR,
  AdditionalProductR,
};
