import React, { useState } from "react";
import {
  FaUser,
  FaSignInAlt,
  FaShoppingCart,
  FaBars,
  FaTimes
} from "react-icons/fa";import { Link } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-black text-white w-full fixed top-0 z-50 px-8" style={{ height: "7rem" }}>
      {/* Main Row */}
      <div className="flex justify-between items-center h-full relative">
        
        {/* Burger Icon - Visible on Mobile */}
        <div className="md:hidden text-2xl cursor-pointer" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Left Menu - Hidden on Mobile */}
        <div className="hidden md:flex gap-6 text-lg font-medium">
          <Link to="/" className="text-white hover:text-gray-400 transition-colors duration-300">Home</Link>
          <Link to="/new-arrival" className="text-white hover:text-gray-400 transition-colors duration-300">New Arrival</Link>
          <Link to="/contact" className="text-white hover:text-gray-400 transition-colors duration-300">Contact Us</Link>
        </div>

        {/* Center Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <img
            src="\assets\z9_white_logo (1).avif"
            alt="Ziro9 Logo"
            className="h-12 object-contain"
          />
        </div>

        {/* Right Icons */}
        <div className="flex gap-6 text-xl cursor-pointer">
          <Link to="/profile" title="Add to Cart" className="hidden md:block">
  <FaUser className="text-white hover:text-gray-400 transition-colors duration-300" />
</Link> 
       <Link to="/signup" title="Add to Cart" className="hidden md:block">
  <FaSignInAlt className="text-white hover:text-gray-400 transition-colors duration-300" />
</Link>
       <Link to="/addtocart" title="Add to Cart" className="hidden md:block">
  <FaShoppingCart className="text-white hover:text-gray-400 transition-colors duration-300" />
</Link>

        </div>
      </div>

      {/* Mobile Menu - Dropdown */}
      <div
  className={`md:hidden bg-black text-white fixed top-0 left-0 h-full w-3/4 max-w-xs z-40 transform transition-transform duration-300 ease-in-out ${
    isMenuOpen ? 'translate-x-0' : '-translate-x-full'
  }`}
>
  <div className="flex flex-col gap-4 p-6 text-lg font-medium mt-20">
    <Link to="/" onClick={toggleMenu} className="hover:text-gray-400">Home</Link>
    <Link to="/new-arrival" onClick={toggleMenu} className="hover:text-gray-400">New Arrival</Link>
    <Link to="/contact" onClick={toggleMenu} className="hover:text-gray-400">Contact Us</Link>
    <div className="flex gap-6 text-xl pt-4">
     
     <Link to="/" title="signn"><FaUser className="hover:text-gray-400" /></Link>
         <Link to="/signup" title="signn"><FaSignInAlt className="hover:text-gray-400" /></Link>
   <Link to="/addtocart" title="Cart"><FaShoppingCart className="hover:text-gray-400" /></Link>
    </div>
  </div>
</div>

    </nav>
  );
}

export default Navbar;
