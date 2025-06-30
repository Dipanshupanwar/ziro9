import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function SummerCollectionDetails({ summerProducts }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("M");
  const [isHovered, setIsHovered] = useState(false);
  const [quantity, setQuantity] = useState(1);
      const BASE_URL = import.meta.env.VITE_API_URL;


  useEffect(() => {
    if (summerProducts && summerProducts.length > 0) {
      const found = summerProducts.find(p => p._id === id);
      setProduct(found || null);
    }
  }, [id, summerProducts]);

  const renderDescription = (name) => {
    switch (name) {
      case 'Tropical Vibes':
        return (
          <div className="mt-12 bg-gray-900 text-white p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">🌴 Feel the Breeze</h2>
            <p>Lightweight fabric, breathable cotton, and vibrant prints for summer comfort.</p>
          </div>
        );
      case 'Beachside':
        return (
          <div className="mt-12 bg-gray-900 text-white p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">🌊 Coastal Cool</h2>
            <p>Perfect for sunny strolls and seaside relaxation — casual and stylish.</p>
          </div>
        );
      default:
        return null;
    }
  };

  const handleQuantityChange = (type) => {
    setQuantity(prev => type === 'inc' ? prev + 1 : Math.max(prev - 1, 1));
  };

  const handleAddToCart = async () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;
  console.log("this is my summer", userId)

  if (!token || !userId) {
    alert("Please log in to add to cart.");
    return navigate("/signup");
  }

  try {
    const res = await fetch(`${BASE_URL}/api/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId: product._id,
        quantity,
        size,
        productType: "summercollection"
      }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Added to cart!");
    } else {
      alert(data.message || "Failed to add to cart");
    }
  } catch (error) {
    console.error("Cart Error:", error);
    alert("Error adding to cart");
  }
};

  const handleBuyNow = () => {
    const isLoggedIn = localStorage.getItem("token");
    if (!isLoggedIn) {
      alert("Please log in to continue with the purchase.");
      navigate("/signup");
      return;
    }
    navigate('/buy', {
      state: {
        product,
        quantity,
        selectedSize: size,
      },
    });
  };

  if (!product) {
    return <div className="text-center text-white py-20">Loading summer item...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Image Section */}
          <div
            className="w-full md:w-1/2 aspect-square relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img
              src={isHovered ? product.hoverImage : product.mainImage}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
            {product.discount && (
              <span className="absolute top-2 right-2 bg-red-600 text-xs px-2 py-1 rounded">
                {product.discount}
              </span>
            )}
          </div>

          {/* Info Section */}
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl font-bold mb-3">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-gray-400 line-through text-lg">₹{product.originalPrice}</span>
              <span className="text-red-400 text-2xl font-bold">₹{product.discountedPrice || product.price}</span>
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium text-white">Size:</label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="bg-gray-800 border border-gray-600 text-white p-2 rounded"
              >
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
                <option value="XL">Extra Large</option>
              </select>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center border border-gray-600 rounded">
                <button
                  onClick={() => handleQuantityChange('dec')}
                  className="px-3 py-1 text-xl bg-gray-700 text-white hover:bg-gray-600"
                >
                  −
                </button>
                <span className="px-4 py-1">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange('inc')}
                  className="px-3 py-1 text-xl bg-gray-700 text-white hover:bg-gray-600"
                >
                  +
                </button>
              </div>

              {/* Buttons */}
              <button
                onClick={handleAddToCart}
                className="bg-white text-black px-6 py-2 rounded hover:bg-gray-300 transition"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="border border-white px-6 py-2 rounded hover:bg-white hover:text-black transition"
              >
                Buy Now
              </button>
            </div>

            <div className="mt-6 space-y-2">
              {product.Fabric && <p><span className="font-semibold">Fabric:</span> {product.Fabric}</p>}
              {product.Print && <p><span className="font-semibold">Print:</span> {product.Print}</p>}
              {product.Iron && <p><span className="font-semibold">Iron:</span> {product.Iron}</p>}
              {product.WashCare && <p><span className="font-semibold">Wash Care:</span> {product.WashCare}</p>}
            </div>
          </div>
        </div>

        {renderDescription(product.name)}
      </div>
    </div>
  );
}

export default SummerCollectionDetails;
