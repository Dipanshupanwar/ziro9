import React from 'react';
import { useLocation } from 'react-router-dom';

const BuyNowPage = () => {
  const location = useLocation();
  const { perfume, product, quantity, selectedSize } = location.state || {};

  const item = product || perfume;

  if (!item) {
    return <div className="text-center text-red-500">No product data!</div>;
  }

  const price = Number(item.discountedPrice?.replace(/[^\d]/g, '') || item.price?.replace(/[^\d]/g, ''));
  const total = price * quantity;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      {/* User Details */}
      <div className="space-y-4 mb-6">
        <input className="border p-2 w-full" type="text" placeholder="Address" />
        <input className="border p-2 w-full" type="tel" placeholder="Phone Number" />
        <input className="border p-2 w-full" type="text" placeholder="Pincode" />
        <input className="border p-2 w-full" type="email" placeholder="Email" />
      </div>

      {/* Payment Option */}
      <div className="mb-6">
        <label className="font-semibold block mb-2">Select Payment Method</label>
        <select className="border p-2 w-full">
          <option value="cod">Cash on Delivery</option>
          <option value="upi">UPI</option>
          <option value="card">Card</option>
        </select>
      </div>

      {/* Order Summary */}
      <div className="border-t pt-4">
        <h3 className="text-lg font-bold mb-3">Order Summary</h3>
        <div className="flex items-center gap-4 mb-2">
          <img src={item.mainImage} alt={item.name} className="w-20 h-20 object-cover" />
          <div>
            <p className="font-semibold">{item.name}</p>
            <p>Size: {selectedSize}</p>
            <p>Qty: {quantity}</p>
            <p>Price: ₹{item.discountedPrice || item.price} each</p>
          </div>
        </div>
        <p className="text-right font-bold mt-2">Total: ₹{total}</p>
      </div>

      <button className="mt-6 w-full bg-green-600 text-white py-2 rounded">
        Place Order
      </button>
    </div>
  );
};

export default BuyNowPage;
