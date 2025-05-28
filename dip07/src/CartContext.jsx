import React, { createContext, useContext, useState, useEffect, use } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage or empty array
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });
  // Sync cart with localStorage on change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add to cart or increase quantity if same product+size exists
  const addToCart = (product, quantity = 1, selectedSize = 'M') => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.id === product.id && item.selectedSize === selectedSize
      );

      if (existingIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingIndex].quantity += quantity;
        return updatedItems;
      } else {
        return [...prevItems, { ...product, quantity, selectedSize }];
      }
    });
  };

  // Remove specific item by id and selectedSize
  const removeFromCart = (product) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(item.id === product.id && item.selectedSize === product.selectedSize)
      )
    );
  };

  // Increase quantity by 1
  const increaseQty = (product) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === product.id && item.selectedSize === product.selectedSize
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease quantity by 1, remove if 0
  const decreaseQty = (product) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === product.id && item.selectedSize === product.selectedSize
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, increaseQty, decreaseQty }}
    >
      {children}
    </CartContext.Provider>
  );
};
