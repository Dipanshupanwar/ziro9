import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext'; // Import the useCart hook

function PerfumeDetails({ products }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart(); // Get addToCart function from context
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState("50 ml");
  const [isHovered, setIsHovered] = useState(false);
  const [qtyCount, setQtyCount] = useState(1); // Added quantity counter

  useEffect(() => {
    if (products && products.length > 0) {
      const found = products.find(p => p._id === id);
      setProduct(found || null);
    }
  }, [id, products]);

  const handleAddToCart = () => {
    if (!product) return;
    
    // Calculate price based on selected quantity
    const price = getPriceForQuantity(product, quantity);
    
    addToCart({
      ...product,
      price, // Use the calculated price
      selectedSize: quantity, // Using quantity as size since it's perfumes
      quantity: qtyCount
    });
    
    alert(`${product.name} (${quantity}) added to cart!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart'); // Redirect to cart page
  };

  // Helper function to calculate price based on quantity
  const getPriceForQuantity = (product, qty) => {
    // Implement your pricing logic here
    // Example: if 100ml is 1.8x price of 50ml, etc.
    const basePrice = parseFloat(product.discountedPrice.replace(/[^\d.]/g, ''));
    
    switch(qty) {
      case '50 ml': return basePrice;
      case '100 ml': return basePrice * 1.8;
      case '150 ml': return basePrice * 2.5;
      default: return basePrice;
    }
  };

  const handleQuantityChange = (type) => {
    setQtyCount(prev => type === 'inc' ? prev + 1 : Math.max(prev - 1, 1));
  };

  // ... keep your existing renderDescription function ...

  if (!product) {
    return <div className="text-center text-white py-20">Loading perfume...</div>;
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
              <span className="text-gray-400 line-through text-lg">{product.originalPrice}</span>
              <span className="text-red-400 text-2xl font-bold">{product.discountedPrice}</span>
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium text-white">Quantity:</label>
              <select 
                value={quantity} 
                onChange={(e) => setQuantity(e.target.value)}
                className="bg-gray-800 border border-gray-600 text-white p-2 rounded"
              >
                <option value="50 ml">50 ml</option>
                <option value="100 ml">100 ml</option>
                <option value="150 ml">150 ml</option>
              </select>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <label className="font-medium text-white">Qty:</label>
              <div className="flex items-center border border-gray-600 rounded">
                <button
                  onClick={() => handleQuantityChange('dec')}
                  className="px-3 py-1 text-xl bg-gray-700 text-white hover:bg-gray-600"
                >
                  −
                </button>
                <span className="px-4 py-1">{qtyCount}</span>
                <button
                  onClick={() => handleQuantityChange('inc')}
                  className="px-3 py-1 text-xl bg-gray-700 text-white hover:bg-gray-600"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-4 mt-4">
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
          </div>
        </div>

        {renderDescription(product.name)}
      </div>
    </div>
  );
}

export default PerfumeDetails;