import React from 'react';
import Footer from '../layouts/Footer';

function ContactPage() {
    return (
        <>
        <div className="bg-black text-white flex flex-col items-center justify-center py-6">
            <div className="max-w-6xl w-full flex flex-col md:flex-row gap-10">
                {/* Left Section */}
                <div className="md:w-1/2">
                    <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                        Do you have any <br /> question?
                    </h1>
                </div>

                {/* Right Section - Form */}
                <div className="md:w-1/2 bg-[#111] p-6 md:p-10 rounded">
                    <form className="space-y-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full bg-transparent border border-gray-600 px-4 py-3 placeholder-gray-400 text-white"
                            />
                            <input
                                type="email"
                                placeholder="E-mail"
                                className="w-full bg-transparent border border-gray-600 px-4 py-3 placeholder-gray-400 text-white"
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="Phone Number"
                            className="w-full bg-transparent border border-gray-600 px-4 py-3 placeholder-gray-400 text-white"
                        />
                        <textarea
                            placeholder="Message"
                            rows="5"
                            className="w-full bg-transparent border border-gray-600 px-4 py-3 placeholder-gray-400 text-white"
                        ></textarea>
                        <button
                            type="submit"
                            className="border border-white text-white px-6 py-3 font-bold hover:bg-white hover:text-black transition"
                        >
                            Send message
                        </button>
                    </form>
                </div>
            </div>
            
        </div>
        <Footer/>
        </>
    );
}

export default ContactPage;
