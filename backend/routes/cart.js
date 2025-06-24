import express from 'express';
import User from '../models/User.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();


// ✅ Add item to cart
router.post('/add', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity, size } = req.body;

  try {
    const user = await User.findById(userId);

    const existingItem = user.cart.find(
      (item) => item.productId.toString() === productId && item.size === size
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ productId, quantity, size });
    }

    await user.save();
    res.status(200).json({ success: true, cart: user.cart });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});


// ✅ Get user cart
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('cart.productId');
    res.status(200).json({ success: true, cart: user.cart });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});


// ✅ Remove item from cart
router.delete('/remove/:productId', authMiddleware, async (req, res) => {
  const { productId } = req.params;
  const size = req.query.size; // optional filter if using size-based products

  try {
    const user = await User.findById(req.user.id);

    user.cart = user.cart.filter((item) =>
      item.productId.toString() !== productId || (size && item.size !== size)
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

export default router;
