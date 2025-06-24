import React, { useState } from 'react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Footer() {
    const currentYear = new Date().getFullYear();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [status, setStatus] = useState('');
     const BASE_URL = import.meta.env.VITE_API_URL;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

const handleSubmit = async (e) => {
  e.preventDefault();
 

  try {
    await axios.post(`${BASE_URL}/api/contact`, formData);
    setStatus('Message sent successfully!');
    setFormData({ name: '', email: '', phone: '', message: '' });
  } catch (error) {
    setStatus('Failed to send message.');
  }
};


    return (
        <footer className="bg-white text-black py-10 px-6 md:px-20">
            <div className="flex flex-col md:flex-row justify-between items-start gap-10">
                {/* Left Section */}
                <div className="flex gap-20">
                    <div>
                        <h3 className="font-bold text-lg mb-3">About</h3>
                        <ul className="space-y-2">
                            <li><Link to="/about" className="hover:underline">About Us</Link></li>
                            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-3">Policies</h3>
                        <ul className="space-y-2">
                            <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
                            <li><Link to="/refund" className="hover:underline">Refund Policy</Link></li>
                            <li><Link to="/shipping" className="hover:underline">Shipping Policy</Link></li>
                            <li><Link to="/terms" className="hover:underline">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Embedded Contact Form */}
                <div className="flex-1 max-w-xl w-full">
                    <h3 className="font-extrabold text-2xl mb-4">Contact Us</h3>
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <textarea
                            name="message"
                            placeholder="Message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows="3"
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <button
                            type="submit"
                            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                        >
                            Send
                        </button>
                        {status && <p className="text-sm text-green-600 mt-1">{status}</p>}
                    </form>
                </div>
            </div>

            {/* Social & Copyright */}
            <div className="flex flex-col md:flex-row justify-between items-center mt-10 gap-4">
                <Link to="/instagram" className="text-2xl hover:text-gray-700">
                    <FaInstagram />
                </Link>
                <p className="text-sm text-gray-600">
                    © {currentYear}, ZIRO9. Powered by <span className="font-semibold">ALPHA VENTURE</span>
                </p>
            </div>

            {/* WhatsApp Button */}
            <div className="fixed bottom-5 right-5 z-50">
                <a
                    href="https://wa.me/your-number"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 text-white rounded-full p-4 shadow-lg hover:scale-105 transition"
                >
                    <FaWhatsapp size={24} />
                </a>
            </div>
        </footer>
    );
}

export default Footer;
