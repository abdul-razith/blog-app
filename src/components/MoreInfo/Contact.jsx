"use client";

import React from "react";
import Link from "next/link";
import { FaEnvelope, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Contact = () => {
    return (
        <div className="container mx-auto px-4 lg:px-1 my-20 text-gray-900">
            {/* Page Title */}
            <h1 className="text-4xl font-bold text-center mb-10 text-gray-900">Contact Us</h1>
            
            {/* Contact Section */}
            <div className="bg-gray-100 p-8 rounded-xl shadow-lg flex flex-col gap-6">
                <p className="text-lg text-center">
                    At <span className="font-bold text-red-600">Fit Life</span>, we value your feedback and questions.
                    Whether you have suggestions for new content, need assistance with a product, or simply want to say hello, we're here to help.
                </p>
                
                {/* Contact Info */}
                <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-center">
                    <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3">
                        <FaEnvelope className="text-red-500 text-3xl mx-auto mb-2" />
                        <h2 className="text-xl font-semibold mb-2">Email</h2>
                        <p className="text-gray-700">daslams721@gmail.com</p>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3">
                        <h2 className="text-xl font-semibold mb-2">Follow Us</h2>
                        <div className="flex justify-center gap-4 text-2xl">
                            <Link href="#" className="text-blue-600 hover:text-blue-800"><FaFacebook /></Link>
                            <Link href="#" className="text-blue-400 hover:text-blue-600"><FaTwitter /></Link>
                            <Link href="#" className="text-pink-600 hover:text-pink-800"><FaInstagram /></Link>
                        </div>
                    </div>
                </div>
                
                {/* Contact Form */}
                {/* <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Send Us a Message</h2>
                    <form className="flex flex-col gap-4">
                        <input type="text" placeholder="Your Name" className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" required />
                        <input type="email" placeholder="Your Email" className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" required />
                        <textarea placeholder="Your Message" rows="4" className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" required></textarea>
                        <button type="submit" className="bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 transition">Send Message</button>
                    </form>
                </div> */}
                
                {/* Additional Resources */}
                <p className="text-center text-gray-700">
                    For more information about our content or to explore our latest posts, visit our <Link href="/category" className="text-red-500 hover:underline">blog section</Link>.
                </p>
            </div>
        </div>
    );
};

export default Contact;
