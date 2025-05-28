import React from 'react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white text-black py-10 px-6 md:px-20">
            <div className="flex flex-col md:flex-row justify-between items-start gap-10">
                {/* Left Section */}
                <div className="flex gap-20">
                    <div>
                        <h3 className="font-bold text-lg mb-3">About</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:underline">About Us</a></li>
                            <li><a href="#" className="hover:underline">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-3">Policies</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                            <li><a href="#" className="hover:underline">Refund Policy</a></li>
                            <li><a href="#" className="hover:underline">Shipping Policy</a></li>
                            <li><a href="#" className="hover:underline">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>

                {/* Middle Section */}
                <div className="flex-1 max-w-md">
                    <h3 className="font-extrabold text-2xl mb-4">Contact Us for any Queries</h3>
                    <div className="flex border border-gray-300 rounded p-2 items-center">
                        <input
                            type="email"
                            placeholder="E-mail"
                            className="flex-grow outline-none px-3"
                        />
                        <button className="bg-gray-200 rounded-full p-2 hover:bg-gray-300">
                            <span className="text-black">{'>'}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Social & Copyright */}
            <div className="flex justify-between items-center mt-10">
                <a href="#" className="text-2xl hover:text-gray-700">
                    <FaInstagram />
                </a>
                <p className="text-sm text-gray-600">
                    © {currentYear}, ZIRO9. Powered by <span className="font-semibold">ALPHA VENTURE</span>
                </p>
            </div>

            {/* WhatsApp Button */}
            <div className="fixed bottom-5 right-5">
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
