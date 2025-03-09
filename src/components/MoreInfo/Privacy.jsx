"use client";

import React from "react";
import Link from "next/link";

const Privacy = () => {
    return (
        <div className="container mx-auto px-4 lg:px-1 my-20">
            {/* Page Title */}
            <h1 className="text-4xl font-bold text-center mb-10 text-gray-900">Privacy Policy</h1>

            {/* Content Box */}
            <div className="p-6 rounded-xl bg-gray-100 shadow-lg flex flex-col gap-6">
                {/* Introduction */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900">Introduction</h2>
                    <p className="text-gray-700 mt-2">
                        At <strong>Fit Life</strong>, we value the trust you place in us when you visit our site. 
                        This Privacy Policy explains how we collect, use, and protect your personal data, 
                        ensuring transparency and compliance with relevant data protection laws, including Google AdSense policies.
                    </p>
                </section>

                {/* Information Collection */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900">Information Collection</h2>
                    <ul className="list-disc list-inside text-gray-700 mt-2">
                        <li>
                            <strong>Cookies & Tracking:</strong> We use cookies to enhance your browsing experience and 
                            serve targeted ads through Google AdSense.
                        </li>
                        <li>
                            <strong>Third-Party Services:</strong> Google AdSense may collect device-specific and location data 
                            to improve ad relevance.
                        </li>
                        <li>
                            <strong>User Information:</strong> We collect voluntarily provided data, such as email addresses for 
                            newsletters and contact forms.
                        </li>
                    </ul>
                </section>

                {/* Data Use */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900">Data Use</h2>
                    <p className="text-gray-700 mt-2">
                        The collected data helps us:
                    </p>
                    <ul className="list-disc list-inside text-gray-700">
                        <li>Personalize your experience with relevant content and ads.</li>
                        <li>Improve our website, services, and overall user experience.</li>
                    </ul>
                </section>

                {/* Data Protection */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900">Data Protection</h2>
                    <ul className="list-disc list-inside text-gray-700 mt-2">
                        <li>
                            <strong>Security Measures:</strong> We implement industry-standard security protocols 
                            to protect your data from unauthorized access.
                        </li>
                        <li>
                            <strong>Legal Compliance:</strong> We comply with privacy laws such as 
                            <span className="text-blue-600"> GDPR</span> and <span className="text-blue-600">CCPA</span>.
                        </li>
                    </ul>
                </section>

                {/* User Rights */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900">User Rights</h2>
                    <ul className="list-disc list-inside text-gray-700 mt-2">
                        <li>
                            <strong>Opt-Out:</strong> You can opt-out of personalized ads via the 
                            <Link href="https://adssettings.google.com" className="text-blue-600"> Google Ads Settings</Link>.
                        </li>
                        <li>
                            <strong>Data Access:</strong> You can request access to your personal data by 
                            contacting us via the email provided below.
                        </li>
                    </ul>
                </section>

                {/* Contact Information */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
                    <p className="text-gray-700 mt-2">
                        If you have any questions or concerns about this Privacy Policy, 
                        please contact us at <strong>daslams721@gmail.com</strong>.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Privacy;
