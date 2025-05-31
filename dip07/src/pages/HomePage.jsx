import React, { useEffect, useState } from "react";

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
import axios from "axios";





function HomePage() {
     const [initialProducts, setInitialProducts] = useState([]);
  const [additionalProducts, setAdditionalProducts] = useState([]);
  const [initialProductsR, setInitialProductsR] = useState([]);
  const [additionalProductsR, setAdditionalProductsR] = useState([]);
  const [ mafiaCollection , setMafiaCollection] = useState([])
  const [ summerCollection , setSummerCollection] = useState([])
  useEffect(() => {
  

  const fetchData = async () => {
    try {
      const res1 = await axios.get("http://localhost:5000/api/products/initial");
      const res2 = await axios.get("http://localhost:5000/api/products/additional");
      const res3 = await axios.get("http://localhost:5000/api/products/initial-r");
      const res4 = await axios.get("http://localhost:5000/api/products/additional-r");
      const res5 = await axios.get("http://localhost:5000/api/perfumes/perfume")
      const res6 = await axios.get("http://localhost:5000/api/perfumes/summercollection")
      console.log  ( "displayedProducts:" , res1.data)

      setInitialProducts(res1.data);
      setAdditionalProducts(res2.data);
      setInitialProductsR(res3.data);
      setAdditionalProductsR(res4.data);
      setMafiaCollection( res5.data);
      setSummerCollection( res6.data)
    } catch (error) {
      console.error("Error fetching data with Axios:", error);
    }
  };

  fetchData();
}, []);

  return (
       <div className="relative bg-black">
      <Navbar/>
      <TopImage/>
      <ContinuousSlider/>
      <Hero/>
      <ProductGallery  initialProducts={initialProducts} additionalProducts={additionalProducts} />
      <Hero2/>
       <PerfumeProductGallery 
        products={mafiaCollection} 
        title="Mafia Collection"
        showItemsInitially={3}
      />
      <Hero3/>
         <PerfumeProductGallery 
        products={summerCollection} 
        title="Summer Collection" 
        showItemsInitially={3}
      />
    
      <ProductGallery  initialProducts={initialProductsR} additionalProducts={additionalProductsR} />

      <Clips/>
      <Footer/>
    </div>
  );
}

export default HomePage;
