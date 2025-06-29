import React, { useEffect, useState } from "react";
import axios from "axios";
import TopImage from '../components/TopImage';
import Footer from '../layouts/Footer';
import ProductGallery from '../components/ProductGallery';
function ArrivalPage() {
    const [allProducts, setAllProducts] = useState([]);
  
    const BASE_URL = import.meta.env.VITE_API_URL;
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/api/products`);
          setAllProducts(res.data);
        } catch (error) {
          console.error("Error fetching products:", error.message);
        }
      };
  
      fetchProducts();
    }, []);
  
    // 👕 Filter data by category
    const clothes = allProducts.filter(p => p.category === "clothes");
  return (
    <div className="relative bg-black">
      <TopImage />
      <ProductGallery products={clothes}
        title="Clothes Collection"
        showItemsInitially={3} />        <Footer />
    </div>

  );
}

export default ArrivalPage;