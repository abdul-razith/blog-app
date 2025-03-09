"use client";

import React from "react";
import Link from "next/link";

const About = () => {
    return (
        <div className="container mx-auto px-4 lg:px-1 my-20">
            {/* Page Title */}
            <h1 className="text-4xl font-bold text-center mb-10 text-gray-900">
                About Us
            </h1>

            {/* About Section */}
            <div className="bg-gray-100 p-10 rounded-xl shadow-lg">
                {/* Introduction */}
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Welcome to <span className="text-red-600">Fit Life</span></h2>
                    <p className="text-gray-700 mt-2">
                        Your premier destination for lifestyle and wellness insights. 
                        Our mission is to empower individuals with valuable information 
                        on fitness, beauty, health, home, and garden topics.
                    </p>
                </div>

                {/* Our Story */}
                <div className="mt-6">
                    <h3 className="text-2xl font-semibold text-gray-900">Our Story</h3>
                    <p className="text-gray-700">
                        We were inspired to create a platform that simplifies access 
                        to reliable wellness information. Our passionate team curates 
                        content that is both informative and engaging.
                    </p>
                </div>

                {/* Our Purpose */}
                <div className="mt-6">
                    <h3 className="text-2xl font-semibold text-gray-900">Our Purpose</h3>
                    <p className="text-gray-700">
                        We connect our audience with the best products and advice, 
                        leveraging Amazon ratings and AI-driven insights to curate 
                        high-quality content.
                    </p>
                </div>
            </div>

            {/* Our Vision & Team Section */}
            <div className="bg-white p-10 mt-10 rounded-xl shadow-lg">
                {/* Our Vision */}
                <div>
                    <h3 className="text-2xl font-semibold text-gray-900">Our Vision</h3>
                    <p className="text-gray-700">
                        We aim to become a trusted source in the lifestyle and wellness 
                        community, providing content that inspires and educates.
                    </p>
                </div>

                {/* Our Team */}
                <div className="mt-6">
                    <h3 className="text-2xl font-semibold text-gray-900">Our Team</h3>
                    <p className="text-gray-700">
                        Our team consists of dedicated individuals who are passionate 
                        about wellness. We carefully select products based on user 
                        reviews to ensure relevance and quality.
                    </p>
                </div>
            </div>

            {/* Contact Us */}
            <div className="bg-gray-100 p-10 mt-10 rounded-xl shadow-lg text-center">
                <h3 className="text-2xl font-semibold text-gray-900">Contact Us</h3>
                <p className="text-gray-700 mt-2">
                    Feel free to reach out to us at 
                    <span className="font-bold text-red-600"> daslams721@gmail.com </span>
                </p>
            </div>
        </div>
    );
};

export default About;
