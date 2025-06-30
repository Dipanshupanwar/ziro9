import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AddToCart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
      const BASE_URL = import.meta.env.VITE_API_URL;

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  useEffect(() => {
    if (!token) {
      setLoading(false); // No need to fetch if not logged in
      return;
    }


    const fetchCart = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/cart/get`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Unauthorized or server error");
        }

        const data = await res.json();
        setCart(data.cart || []);
        console.log("Cart:", data.cart);
      } catch (err) {
        console.error("Error fetching cart:", err);
        setCart([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [token]);

  const updateQuantity = async (productId, size, newQuantity) => {
    try {
      await fetch(`http://localhost:5000/api/cart/update/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: newQuantity, size }),
      });
      window.location.reload();
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const removeItem = async (productId, size) => {
    try {
      await fetch(`http://localhost:5000/api/cart/remove/${productId}?size=${size}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      window.location.reload();
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const total = Array.isArray(cart)
    ? cart.reduce((acc, item) => {
        const price = item.productId?.price || item.priceAtAddition || 0;
        return acc + item.quantity * price;
      }, 0)
    : 0;

  if (!token) {
    return (
      <div className="text-center mt-10 text-gray-600">
        Please <Link to="/login" className="text-blue-600 underline">login</Link> to view your cart.
      </div>
    );
  }

  if (loading) {
    return <div className="text-center mt-10">Loading cart...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => {
            if (!item.productId) return null;

            return (
              <div
                key={item.productId._id + item.size}
                className="flex items-center justify-between bg-white shadow rounded p-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.productId.mainImage}
                    alt={item.productId.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <Link
                      to={`/${item.productId.category}/${item.productId._id}`}
                      className="text-lg font-semibold text-blue-600 hover:underline"
                    >
                      {item.productId.name}
                    </Link>
                    <p>Size: {item.size}</p>
                    <p>Price: ₹{item.productId?.price || item.priceAtAddition}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() =>
                      updateQuantity(item.productId._id, item.size, item.quantity - 1)
                    }
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item.productId._id, item.size, item.quantity + 1)
                    }
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(item.productId._id, item.size)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
          <div className="text-right text-xl font-bold mt-4">Total: ₹{total}</div>
        </div>
      )}
    </div>
  );
};

export default AddToCart;
