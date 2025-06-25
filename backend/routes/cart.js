const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
const {
  InitialProduct,
  AdditionalProduct,
  InitialProductR,
  AdditionalProductR
} = require('../models/ProductModel');

const {
  perfumeModel,
  summerCollectionModel
} = require('../models/PerfumeModel');

router.get('/get', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const populatedCart = await Promise.all(
      user.cart.map(async (item) => {
        let productData = null;

        switch (item.productType) {
          case 'Perfume':
            productData = await perfumeModel.findById(item.productId).lean();
            break;
          case 'summercollection':
            productData = await summerCollectionModel.findById(item.productId).lean();
            break;
          case 'InitialProduct':
            productData = await InitialProduct.findById(item.productId).lean();
            break;
          case 'AdditionalProduct':
            productData = await AdditionalProduct.findById(item.productId).lean();
            break;
          case 'InitialProductR':
            productData = await InitialProductR.findById(item.productId).lean();
            break;
          case 'AdditionalProductR':
            productData = await AdditionalProductR.findById(item.productId).lean();
            break;
        }

        return {
          ...item.toObject(),
          product: productData || {}
        };
      })
    );

    res.status(200).json({ success: true, cart: populatedCart });
  } catch (err) {
    console.error("Fetch cart error:", err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ✅ Add item to cart
router.post('/add', authMiddleware, async (req, res) => {
  const { productId, productType, quantity, size } = req.body;

  try {
    const user = await User.findById(req.user.id);

    const existingItem = user.cart.find(
      (item) => item.productId.toString() === productId && item.size === size
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ productId, productType, quantity, size });
    }

    await user.save();
    res.status(200).json({ success: true, cart: user.cart });
  } catch (err) {
    console.error("Add to cart error:", err.message);
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});



// ✅ Remove item from cart
router.delete('/remove/:productId', authMiddleware, async (req, res) => {
  const { productId } = req.params;
  const size = req.query.size;

  try {
    const user = await User.findById(req.user.id);

    user.cart = user.cart.filter(
      (item) => item.productId.toString() !== productId || (size && item.size !== size)
    );

    await user.save();
    res.status(200).json({ success: true, cart: user.cart });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove item' });
  }
});

// ✅ Update quantity of item
router.put('/update/:productId', authMiddleware, async (req, res) => {
  const { productId } = req.params;
  const { quantity, size } = req.body;

  try {
    const user = await User.findById(req.user.id);
    const item = user.cart.find(
      (item) => item.productId.toString() === productId && item.size === size
    );

    if (!item) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }

    item.quantity = quantity;
    await user.save();
    res.status(200).json({ success: true, cart: user.cart });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update quantity' });
  }
});

// ✅ Clear entire cart
router.delete('/clear', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.cart = [];
    await user.save();
    res.status(200).json({ success: true, message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to clear cart' });
  }
});

module.exports = router;
