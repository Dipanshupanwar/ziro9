const express = require('express');
const router = express.Router();
const Product = require("../models/ProductsModel");

// Get all products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Get products by category
router.get('/:category', async (req, res) => {
  const { category } = req.params;
  const products = await Product.find({ category });
  res.json(products);
});

module.exports = router;
