import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const getToken = () => localStorage.getItem('token');

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());

  const getId = (product) => product.id || product._id;

  // Merge function: avoids duplicates and sums quantity
  const mergeCarts = (local, remote) => {
    const merged = [...remote];
    local.forEach((localItem) => {
      const index = merged.findIndex(
        (item) =>
          getId(item) === getId(localItem) && item.selectedSize === localItem.selectedSize
      );
      if (index !== -1) {
        merged[index].quantity += localItem.quantity;
      } else {
        merged.push(localItem);
      }
    });
    return merged;
  };

  // Load initial cart
  useEffect(() => {
    const token = getToken();
    const localCart = JSON.parse(localStorage.getItem('cart')) || [];

    if (token) {
      setIsLoggedIn(true);

      fetch('http://localhost:5000/api/cart', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch backend cart');
          return res.json();
        })
        .then((data) => {
          const backendCart = data.items || [];
          const mergedCart = mergeCarts(localCart, backendCart);
          setCartItems(mergedCart);
        })
        .catch((err) => {
          console.error('Error loading cart:', err);
          setCartItems(localCart); // fallback
        });
    } else {
      setCartItems(localCart);
    }
  }, [isLoggedIn]);

  // Always update localStorage on cart change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Sync to backend if logged in
  useEffect(() => {
    if (!isLoggedIn) return;
    const token = getToken();
    if (!token) return;

    const syncToBackend = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/cart/sync', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ items: cartItems }),
        });

        if (!res.ok) {
          console.error('Failed to sync cart:', await res.text());
        }
      } catch (err) {
        console.error('Sync error:', err);
      }
    };

    syncToBackend();
  }, [cartItems, isLoggedIn]);

  const addToCart = (product, quantity = 1, selectedSize = 'M') => {
    const productId = getId(product);
    setCartItems((prev) => {
      const index = prev.findIndex(
        (item) => getId(item) === productId && item.selectedSize === selectedSize
      );
      const updated = [...prev];
      if (index !== -1) {
        updated[index].quantity += quantity;
      } else {
        updated.push({ ...product, quantity, selectedSize });
      }
      return updated;
    });
  };

  const removeFromCart = (product) => {
    const productId = getId(product);
    setCartItems((prev) =>
      prev.filter(
        (item) => !(getId(item) === productId && item.selectedSize === product.selectedSize)
      )
    );
  };

  const increaseQty = (product) => {
    const productId = getId(product);
    setCartItems((prev) =>
      prev.map((item) =>
        getId(item) === productId && item.selectedSize === product.selectedSize
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (product) => {
    const productId = getId(product);
    setCartItems((prev) =>
      prev
        .map((item) =>
          getId(item) === productId && item.selectedSize === product.selectedSize
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
