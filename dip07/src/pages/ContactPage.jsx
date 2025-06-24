import React, { useState } from "react";
import axios from "axios";
import Footer from "../layouts/Footer";

function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });
    const BASE_URL = import.meta.env.VITE_API_URL;

    const [status, setStatus] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           const res = await axios.post(`${BASE_URL}/api/contact`, formData);
            setStatus("Message sent successfully!");
            setFormData({ name: "", email: "", phone: "", message: "" });
        } catch (error) {
            setStatus("Failed to send message.");
        }
    };

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
                    {status && <p className="mt-4 text-green-400">{status}</p>}
                </div>

                {/* Right Section - Form */}
                <div className="md:w-1/2 bg-[#111] p-6 md:p-10 rounded">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="flex flex-col md:flex-row gap-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-transparent border border-gray-600 px-4 py-3 placeholder-gray-400 text-white"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="E-mail"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-transparent border border-gray-600 px-4 py-3 placeholder-gray-400 text-white"
                            />
                        </div>
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full bg-transparent border border-gray-600 px-4 py-3 placeholder-gray-400 text-white"
                        />
                        <textarea
                            name="message"
                            placeholder="Message"
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
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
