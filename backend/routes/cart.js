// routes/cart.js
const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");
const authMiddleware = require("../middleware/auth");
router.post("/sync", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { items } = req.body;

    const normalizedItems = items.map(item => ({
      productId: item.productId || item.id,
      quantity: item.quantity,
      selectedSize: item.selectedSize || 'M',
      name: item.name,
      price: item.price,
      image: item.image
    }));

    const updatedCart = await Cart.findOneAndUpdate(
      { user: userId },
      { items: normalizedItems },
      { upsert: true, new: true }
    );

    res.status(200).json({
      message: "Cart synced successfully",
      cart: updatedCart
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to sync cart", error: err.message });
  }
});



// routes/cart.js (add this below /sync route)

router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(200).json({ items: [] }); // empty cart
    }

    res.status(200).json({ items: cart.items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get cart" });
  }
});

// routes/cart.js (add below the get route)

router.put("/update", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    if (!productId || typeof quantity !== "number") {
      return res.status(400).json({ message: "Invalid request" });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex((item) => item.productId === productId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    res.status(200).json({ message: "Quantity updated", items: cart.items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update quantity" });
  }
});
// routes/cart.js (add below the update route)

router.delete("/remove", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter((item) => item.productId !== productId);
    await cart.save();

    res.status(200).json({ message: "Item removed", items: cart.items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to remove item" });
  }
});
// routes/cart.js (add below the remove route)

router.post("/add", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity = 1 } = req.body;

    if (!productId || quantity <= 0) {
      return res.status(400).json({ message: "Invalid product or quantity" });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      // create new cart if not exists
      cart = new Cart({ user: userId, items: [] });
    }

    const itemIndex = cart.items.findIndex((item) => item.productId === productId);
    if (itemIndex > -1) {
      // product exists, update quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // new product, add to cart
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.status(200).json({ message: "Item added to cart", items: cart.items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add to cart" });
  }
});



module.exports = router;
