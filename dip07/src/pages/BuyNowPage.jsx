import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const BuyNowPage = () => {
  const location = useLocation();
  const { product, perfume, quantity, selectedSize } = location.state || {};
  const item = product || perfume;
  const BASE_URL = import.meta.env.VITE_API_URL;

  const [prefill, setPrefill] = useState({
    name: '',
    email: '',
    contact: '',
    address: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('checkoutPrefill');
    if (saved) {
      setPrefill(JSON.parse(saved));
    }
  }, []);

  const handleChange = (e) => {
    setPrefill({ ...prefill, [e.target.name]: e.target.value });
  };

  const savePrefill = () => {
    localStorage.setItem('checkoutPrefill', JSON.stringify(prefill));
  };

  const handlePayment = async () => {
    const { name, email, contact, address } = prefill;

    if (!name || !email || !contact || !address) {
      alert("Please fill in all your details before proceeding.");
      return;
    }

    savePrefill();

    const res = await new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

    if (!res) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    const totalAmount = item.price * quantity;
    

    const result = await fetch(`${BASE_URL}/api/payment/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: totalAmount }),
    });

    const data = await result.json();

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: "INR",
      name: "Dip Notes",
      description: `Payment for ${item.name}`,
      order_id: data.id,
      handler: function (response) {
        alert("Payment successful!");
        console.log("Payment Details:", response);
      },
      prefill: {
        name,
        email,
        contact
      },
      notes: {
        address,
        size: selectedSize,
        quantity,
        product: item.name
      },
      theme: {
        color: "#3399cc"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (!item) {
    return <div className="text-center text-red-500">No product data!</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 grid md:grid-cols-2 gap-10">
      {/* User Details Input */}
      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-xl font-bold mb-4">Your Details</h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={prefill.name}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={prefill.email}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="tel"
          name="contact"
          placeholder="Phone Number"
          value={prefill.contact}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />
        <textarea
          name="address"
          placeholder="Shipping Address"
          value={prefill.address}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows="4"
        ></textarea>
        <button
          onClick={() => {
            setPrefill({ name: "", email: "", contact: "", address: "" });
            localStorage.removeItem("checkoutPrefill");
          }}
          className="mt-4 text-red-600 hover:underline"
        >
          Clear Saved Info
        </button>
      </div>

      {/* Order Summary */}
      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <p><strong>Product:</strong> {item.name}</p>
        <p><strong>Size:</strong> {selectedSize}</p>
        <p><strong>Quantity:</strong> {quantity}</p>
        <p><strong>Price:</strong> ₹{item.price} each</p>
        <p><strong>Total:</strong> ₹{item.price * quantity}</p>

        <button
          onClick={handlePayment}
          className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Pay with UPI
        </button>
      </div>
    </div>
  );
};

export default BuyNowPage;
