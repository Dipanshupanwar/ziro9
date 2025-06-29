import React, { useEffect, useState } from "react";
import axios from "axios";

import TopImage from "../components/TopImage";
import ContinuousSlider from "../components/ContinuousSlider";
import Navbar from "../layouts/Navbar";
import Hero from "../components/Hero";
import ProductGallery from "../components/ProductGallery";
import Hero2 from "../components/Hero2";
import PerfumeProductGallery from "../components/PerfumeProductGallery";
import Hero3 from "../components/Hero3";
import Clips from "../components/Clips";
import Footer from "../layouts/Footer";

function HomePage() {
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
  const perfumes = allProducts.filter(p => p.category === "perfume");
  const summer = allProducts.filter(p => p.category === "summer");

  return (
    <div className="relative bg-black">
      <Navbar />
      <TopImage />
      <ContinuousSlider />
      <Hero />

      <ProductGallery products={clothes}
       title="Clothes Collection"
        showItemsInitially={3} />

      <Hero2 />
      <PerfumeProductGallery
        products={perfumes}
        title="Mafia Collection"
        showItemsInitially={3}
      />
      <Hero3 />
      <PerfumeProductGallery
        products={summer}
        title="Summer Collection"
        showItemsInitially={3}
      />
      <Clips />
      <Footer />
    </div>
  );
}

export default HomePage;
