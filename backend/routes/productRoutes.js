// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const {
  InitialProduct,
  AdditionalProduct,
  InitialProductR,
  AdditionalProductR,
} = require('../models/ProductModel');

// GET /api/products/initial
router.get('/initial', async (req, res) => {
  const products = await InitialProduct.find();
  console.log('Initial Products:', products);  // <-- see output in backend console
  res.json(products);
});


// GET /api/products/additional
router.get('/additional', async (req, res) => {
  const products = await AdditionalProduct.find();
  res.json(products);
});

// GET /api/products/initial-r
router.get('/initial-r', async (req, res) => {
  const products = await InitialProductR.find();
  res.json(products);
});

// GET /api/products/additional-r
router.get('/additional-r', async (req, res) => {
  const products = await AdditionalProductR.find();
  res.json(products);
});

module.exports = router;
