import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-6 mt-10">
            <div className="container mx-auto px-4 text-center flex flex-col gap-6 md:gap-4">
                {/* Social Media Icons */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                    <a href="#" className="hover:text-blue-400 transition">
                        <FaFacebook size={22} />
                    </a>
                    <a href="#" className="hover:text-blue-300 transition">
                        <FaTwitter size={22} />
                    </a>
                    <a href="#" className="hover:text-pink-400 transition">
                        <FaInstagram size={22} />
                    </a>
                    <a href="#" className="hover:text-blue-500 transition">
                        <FaLinkedin size={22} />
                    </a>
                </div>

                {/* Footer Links */}
                <nav className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm">
                    <a href="#" className="hover:underline">About</a>
                    <a href="#" className="hover:underline">Privacy Policy</a>
                    <a href="#" className="hover:underline">Terms of Service</a>
                    <a href="#" className="hover:underline">Contact</a>
                </nav>

                {/* Copyright */}
                <div className="text-gray-400 text-xs md:text-sm">
                    &copy; {new Date().getFullYear()} Your Blog Name. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
