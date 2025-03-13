import Link from "next/link";
import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

// Social Media Links Array
const socialLinks = [
    { icon: FaFacebook, href: "#", color: "hover:text-blue-400" },
    { icon: FaTwitter, href: "#", color: "hover:text-blue-300" },
    { icon: FaInstagram, href: "#", color: "hover:text-pink-400" },
    { icon: FaLinkedin, href: "#", color: "hover:text-blue-500" },
];

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-6 mt-10">
            <div className="container mx-auto px-4 text-center flex flex-col gap-6 md:gap-4">

                {/* Social Media Icons */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                    {socialLinks.map(({ icon: Icon, href, color }, index) => (
                        <a key={index} href={href} className={`${color} transition`} aria-label="Visit our page">
                            <Icon size={22} />
                        </a>
                    ))}
                </div>

                {/* Footer Links */}
                <nav className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm">
                    {["privacy-policy", "terms-and-conditions", "disclaimer"].map((link, index) => (
                        <Link key={index} href={`/${link}`} aria-label={`Read our ${link.replace("-", " ")}`}>
                            {link.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                        </Link>
                    ))}
                </nav>

                {/* Copyright */}
                <div className="text-gray-400 text-xs md:text-sm">
                    &copy; {new Date().getFullYear()} @Fit Life. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
