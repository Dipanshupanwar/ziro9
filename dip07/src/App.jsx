import React,{useEffect,useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";


import HomePage from './pages/HomePage';
import Navbar from './layouts/Navbar';
import ContactPage from './pages/ContactPage';
import ArrivalPage from './pages/ArrivalPage';
import ProductDetails from './pages/ProductDetailsPage';
import axios from 'axios';
import Cart from './pages/Cart';
import PerfumeDetails from './pages/PerfumeDetails';
import SummerCollectionDetails from './pages/SummerCollectionDetails';


function App() {



  const [productSet1, setProductSet1] = useState([[], [],[], [],[]]);
  const [ perfume , setPerfume] = useState([])
   const [ summer , setSummer] = useState([])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await axios.get("http://localhost:5000/api/products/initial");
        const res2 = await axios.get("http://localhost:5000/api/products/additional");
        const res3 = await axios.get("http://localhost:5000/api/products/initial-r");
        const res4 = await axios.get("http://localhost:5000/api/products/additional-r");
        const res5 = await axios.get("http://localhost:5000/api/perfumes/perfume")
        const res6 = await axios.get("http://localhost:5000/api/perfumes/summercollection")

        // Grouped as per your logic
        setProductSet1([res1.data, res2.data, res3.data, res4.data, res6.data]); // First set
        setPerfume(res5.data);
           setSummer(res6.data);
       // Second set
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <BrowserRouter>
      <Navbar/>
      <div className="pt-28"> {/* To push content below the fixed navbar */}
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/new-arrival" element={<ArrivalPage/>} />
          <Route path="/contact" element={<ContactPage/>} />
          <Route path="/product/:id" element={<ProductDetails  products={productSet1}  />}/>
         <Route path="/perfume/:id" element={<PerfumeDetails products={perfume} />}/>
         <Route path="/summer/:id" element={<SummerCollectionDetails summerProducts={summer} />} />

            <Route path="/cart" element={<Cart/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
