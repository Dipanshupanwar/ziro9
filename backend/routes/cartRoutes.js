const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const authMiddleware = require("../middleware/auth");

// POST /api/cart/add
const mongoose = require("mongoose");

router.post("/add", authMiddleware, async (req, res) => {
  const { productId, quantity = 1, size = "" } = req.body;
  const userId = req.user.id;

  try {
    const objectProductId = new mongoose.Types.ObjectId(productId);

    // ✅ Confirm product exists before pushing
    const productExists = await mongoose.model("Product").exists({ _id: objectProductId });
    if (!productExists) {
      return res.status(400).json({ message: "Invalid Product ID" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [{ productId: objectProductId, quantity, size }] });
    } else {
      const existingItem = cart.items.find(
        item =>
          item.productId?.toString() === productId &&
          item.size === size
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId: objectProductId, quantity, size });
      }
    }

    await cart.save();
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ message: "Failed to add item to cart" });
  }
});



//get here guys 
router.get("/get", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("req.user:", req.user);





  const cart = await Cart.findOne({ userId }).populate("items.productId");
console.log("Populated Cart:", cart);





    if (!cart) {
      return res.status(200).json({ cart: [] }); // Empty cart
    }

    res.status(200).json({ cart: cart.items });
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ message: "Server error" });
  }
});
// update 
router.put("/update/:productId", authMiddleware, async (req, res) => {
  const { productId } = req.params;
  const { quantity, size } = req.body;
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (item) =>
        item.productId.toString() === productId && item.size === size
    );

    if (!item) return res.status(404).json({ message: "Item not found in cart" });

    item.quantity = Math.max(1, quantity);

    await cart.save();
    res.status(200).json({ message: "Cart updated successfully" });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Failed to update cart" });
  }
});

// ✅ Remove Cart Item
router.delete("/remove/:productId", authMiddleware, async (req, res) => {
  const { productId } = req.params;
  const { size } = req.query;
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) =>
        !(item.productId.toString() === productId && item.size === size)
    );

    await cart.save();
    res.status(200).json({ message: "Item removed from cart" });
  } catch (err) {
    console.error("Remove error:", err);
    res.status(500).json({ message: "Failed to remove item from cart" });
  }
});

module.exports = router;
