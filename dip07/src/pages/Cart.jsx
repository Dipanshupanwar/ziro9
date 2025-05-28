import React from 'react';
import { useCart } from '../CartContext';

const Cart = () => {
  const { cartItems, increaseQty, decreaseQty, removeFromCart } = useCart();

  const calculateTotal = () =>
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
console.log(cartItems);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-24">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.selectedSize}`}
                className="flex justify-between items-center border-b pb-4 gap-4"
              >
                {/* Image section */}
                <img
                 src={item.mainImage}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                {/* Product details */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">Size: {item.selectedSize}</p>
                  <p className="text-sm text-gray-500">Price: ₹{item.price || item.originalPrice}</p>
                </div>

                {/* Quantity controls */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => decreaseQty(item)}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => increaseQty(item)}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                  >
                    +
                  </button>
                </div>

                {/* Total & remove */}
              <div className="text-right">
 <p className="font-semibold text-lg">
  ₹{
    (parseInt(
      (item.price || item.originalPrice || '0')  // Use price, fallback to originalPrice, then '0'
      .toString()                              // Ensure it's a string
      .replace(/[^\d]/g, '')                   // Remove non-digit characters
    ) * item.quantity)
    .toLocaleString('en-IN')                   // Format with Indian locale
  }
</p>
  <button
    onClick={() => removeFromCart(item)}
    className="text-red-500 text-sm hover:underline mt-1"
  >
    Remove
  </button>
</div>

              </div>
            ))}
          </div>

          <div className="text-right mt-8">
            <h4 className="text-2xl font-bold">Total: ₹{calculateTotal()}</h4>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
