import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PerfumeProductGallery({ products = [], title = "", showItemsInitially = 5 }) {
  const [showAll, setShowAll] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const navigate = useNavigate();

  const initialProducts = products.slice(0, showItemsInitially);
  const additionalProducts = products.slice(showItemsInitially);
  const displayedProducts = showAll ? products : initialProducts;

  // Normalize the title for route logic
  const normalizedTitle = title.toLowerCase().replace(/\s+/g, '');

  // Determine route based on title
  const handleNavigation = (productId) => {
    if (normalizedTitle === "summercollection") {
      navigate(`/summer/${productId}`);
    } else if (normalizedTitle === "mafiacollection" || normalizedTitle === "mafiacoleections") {
      navigate(`/perfume/${productId}`);
    } else {
      navigate(`/summer/${productId}`); // default fallback
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {title && <h2 className="text-2xl font-bold text-white mb-8 text-center">{title}</h2>}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {displayedProducts.map((product) => (
          <ProductCard 
            key={product._id}
            product={product}
            hoveredProduct={hoveredProduct}
            setHoveredProduct={setHoveredProduct}
            onClick={() => handleNavigation(product._id)}
          />
        ))}
      </div>

      {additionalProducts.length > 0 && !showAll && (
        <div className="text-center mt-12">
          <button
            onClick={() => setShowAll(true)}
            className="px-6 py-2 border border-white bg-transparent text-white hover:bg-white hover:text-black transition-colors duration-300 rounded-sm"
          >
            SEE ALL PRODUCTS ({products.length})
          </button>
        </div>
      )}
    </div>
  );
}

function ProductCard({ product, hoveredProduct, setHoveredProduct, onClick }) {
  return (
    <div 
      className="relative group cursor-pointer"
      onMouseEnter={() => setHoveredProduct(product._id)}
      onMouseLeave={() => setHoveredProduct(null)}
      onClick={onClick}
    >
      {product.discount && (
        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
          {product.discount}
        </div>
      )}
      
      <div className="aspect-square overflow-hidden relative">
        <img
          src={product.mainImage}
          alt={product.name}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            hoveredProduct === product._id ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <img
          src={product.hoverImage}
          alt={`${product.name} - alternate view`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            hoveredProduct === product._id ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      <div className="mt-4 text-center">
        <h3 className="text-lg text-white font-medium">{product.name}</h3>
        <div className="flex justify-center items-center gap-2">
          <p className="text-gray-400 line-through text-sm">{product.originalPrice}</p>
          <p className="text-red-500 font-bold">{product.price}</p>
        </div>
      </div>
    </div>
  );
}

export default PerfumeProductGallery;
