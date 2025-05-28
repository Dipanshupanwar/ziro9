import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext.jsx';

function ProductDetails({ products = [] }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const flatProducts = products.flat();
 const product = flatProducts.find(p => String(p.id || p._id) === id);


  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <p className="text-center text-red-500 mt-10">Product not found.</p>;
  }

  const handleQuantityChange = (type) => {
    setQuantity(prev => type === 'inc' ? prev + 1 : Math.max(prev - 1, 1));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize);
    alert("Added to cart!");
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize);
    navigate('/purchase');
  };

  return (
    <div className="max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-10">
      {/* Image Section */}
      <div className="border p-4 rounded-lg bg-white shadow-md">
       {console.log("this is the game",product.mainImage)}
        <img src={`/${product.mainImage}`}  alt={product.name} className="w-full h-auto rounded-lg" />
        {/* <img src={`/${product.hoverImage}`} alt="hover" className="mt-4 w-full h-auto rounded-lg" /> */}
      </div>

      {/* Info Section */}
      <div className="flex flex-col gap-4 text-black">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-xl">{product.price}</p>
        <p><strong>Discount:</strong> {product.discount}</p>
        <p><strong>Fabric:</strong> {product.Fabric}</p>
        <p><strong>Print:</strong> {product.Print}</p>
        <p><strong>Iron:</strong> {product.Iron}</p>
        <p><strong>Wash Care:</strong> {product.WashCare}</p>

        {/* Size Selection */}
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Select Size:</h2>
          <div className="flex gap-3">
            {['S', 'M', 'L', 'XL'].map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded border ${
                  selectedSize === size ? 'bg-black text-white' : 'bg-white text-black'
                } hover:bg-black hover:text-white transition`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="mt-4 flex items-center gap-4">
          <h2 className="text-lg font-semibold">Quantity:</h2>
          <div className="flex items-center border rounded overflow-hidden">
            <button
              onClick={() => handleQuantityChange('dec')}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-black"
            >
              −
            </button>
            <span className="px-4">{quantity}</span>
            <button
              onClick={() => handleQuantityChange('inc')}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-black"
            >
              +
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={handleAddToCart}
            className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded shadow"
          >
            Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded shadow"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
