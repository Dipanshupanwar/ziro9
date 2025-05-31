import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../CartContext';
import { useNavigate } from 'react-router-dom';
  
const PerfumeDetails = ({ perfumes }) => {
    const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useCart();
  const perfume = perfumes.find((item) => item._id === id);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');

useEffect(() => {
  setSelectedSize('50 ml');
}, []);

  if (!perfume) {
    return <div className="text-center text-red-400 mt-10">Perfume not found!</div>;
  }

  const handleAddToCart = () => {
    addToCart(perfume, quantity, selectedSize);
    alert("Added to cart!");
  };

  const handleBuyNow = () => {
  navigate('/buy', {
    state: {
      perfume,
      quantity,
      selectedSize,
    },
  });
};


  return (
    <div className=" mx-auto p-20  bg-black text-black shadow-md rounded-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Perfume Image */}
        <div className="relative group">
          <img
            src={perfume.mainImage}
            alt={perfume.name}
            className="w-full rounded-lg transition-opacity duration-300 group-hover:opacity-0"
          />
          <img
            src={perfume.hoverImage}
            alt={`${perfume.name} hover`}
            className="absolute top-0 left-0 w-full h-full object-cover rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>

        {/* Perfume Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2 text-white">{perfume.name}</h1>
          <p className="text-gray-300 text-lg mb-1">
            <span className="line-through">{perfume.originalPrice}</span>
            <span className="text-green-400 font-semibold ml-2">{perfume.discountedPrice}</span>
          </p>
          <p className="text-red-400 font-semibold mb-4">{perfume.discount}</p>

          {/* Size Option */}
          <div className="mb-4">
            <label className="block font-medium mb-1 text-white">Size</label>
            <select className="border border-gray-600 bg-gray-800 text-white px-3 py-2 rounded w-32" disabled>
              <option value="50ml">50ml</option>
            </select>
          </div>

          {/* Optional Details */}
          {perfume.Fabric && <p><strong>Fabric:</strong> {perfume.Fabric}</p>}
          {perfume.Print && <p><strong>Print:</strong> {perfume.Print}</p>}
          {perfume.Iron && <p><strong>Iron:</strong> {perfume.Iron}</p>}
          {perfume.WashCare && <p><strong>Wash Care:</strong> {perfume.WashCare}</p>}

          {/* Quantity Selector */}
          <div className="mb-4 mt-4">
            <label className="block font-medium mb-1 text-white">Quantity</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border border-gray-600 bg-gray-800 text-white px-3 py-2 rounded w-20"
            />
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-wrap gap-4">
            <button
              onClick={handleAddToCart}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfumeDetails;
