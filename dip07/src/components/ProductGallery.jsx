import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


// const initialProducts = [
//   {
//     id: 1,
//     name: 'Spray White',
//     price: ' Rs 999',
//     mainImage: 'src/assets/Artboard1.webp',
//     hoverImage: 'src/assets/Artboard2.webp'
//   },
//   {
//     id: 2,
//     name: 'White Bloom',
//     price: 'Rs 999',
//     mainImage: 'src/assets/Artboard9.webp',
//     hoverImage: 'src/assets/Artboard10.webp'
//   },
//   {
//     id: 3,
//     name: 'Skull Black',
//     price: 'RS 999',
//     mainImage: 'src/assets/Artboard17.webp',
//     hoverImage: 'src/assets/Artboard18.webp'
//   },
// ];

// const additionalProducts = [
//   {
//     id: 4,
//     name: 'Limited Cap',
//     price: '$39.99',
//     mainImage: 'https://example.com/cap-front.jpg',
//     hoverImage: 'https://example.com/cap-back.jpg'
//   },
//   {
//     id: 5,
//     name: 'Elite Jacket',
//     price: '$129.99',
//     mainImage: 'https://example.com/jacket-front.jpg',
//     hoverImage: 'https://example.com/jacket-back.jpg'
//   },
//   {
//     id: 6,
//     name: 'Essential Shorts',
//     price: '$45.99',
//     mainImage: 'https://example.com/shorts-front.jpg',
//     hoverImage: 'https://example.com/shorts-back.jpg'
//   },
// ];

function ProductGallery({ initialProducts,additionalProducts}) {
  const [showAll, setShowAll] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const navigate = useNavigate();


  const displayedProducts = showAll 
    ? [...initialProducts, ...additionalProducts]
    : initialProducts;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

        {displayedProducts.map((product) => (
          <div 
            key={product.id}
            className="relative group"
                  onClick={() => 
  navigate(`/product/${product.id}`)
}
     

            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            <div className="aspect-square overflow-hidden relative">
                {console.log("this is my image",product.mainImage)}
              <img
                src={product.mainImage}
                alt={product.name}
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  hoveredProduct === product.id ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <img
                src={product.hoverImage}
                alt={`${product.name} - alternate view`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>
            <div className="mt-4">
              <h3 className="text-lg text-white font-medium">{product.name}</h3>
              <p className="text-white">{product.price}</p>
            </div>
          </div>
        ))}
      </div>

      {!showAll && (
        <div className="text-center mt-12">
          <button
            onClick={() => setShowAll(true)}
            className="px-3 py-2 border border-black bg-white text-black hover:bg-black hover:text-white transition-colors duration-300"
          >
            SEE ALL PRODUCTS...
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductGallery;