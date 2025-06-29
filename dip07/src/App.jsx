import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";


import HomePage from './pages/HomePage';
import Navbar from './layouts/Navbar';
import ContactPage from './pages/ContactPage';
import ArrivalPage from './pages/ArrivalPage';
import ProductDetails from './pages/ProductDetailsPage';
import axios from 'axios';

import PerfumeDetails from './pages/PerfumeDetails';
import SummerCollectionDetails from './pages/SummerCollectionDetails';
import BuyNowPage from './pages/BuyNowPage';
import Signup from "./components/Signup";
import OtpVerify from "./components/OtpVerify";
import Login from "./components/Login";
import ProfilePage from './pages/ProfilePage';
import About from './pages/About';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import AddToCart from './pages/AddToCart';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';





function App() {



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
    <BrowserRouter>
      <Navbar />
      <div className="pt-28"> {/* To push content below the fixed navbar */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new-arrival" element={<ArrivalPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/clothes/:id" element={<ProductDetails products={clothes} />} />
          <Route path="/perfume/:id" element={<PerfumeDetails perfumes={perfumes} />} />
          <Route path="/summer/:id" element={<SummerCollectionDetails summerProducts={summer} />} />
          <Route path="/buy" element={<BuyNowPage />} />
         
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={<OtpVerify />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/refund" element={<RefundPolicy />} />
          <Route path="/shipping" element={<ShippingPolicy />} />
           <Route path="/addtocart" element={<AddToCart />} />
           <Route path='/forgot-password' element={<ForgotPassword/>}/>
           <Route path="/reset-password" element={<ResetPassword/>} />



        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
