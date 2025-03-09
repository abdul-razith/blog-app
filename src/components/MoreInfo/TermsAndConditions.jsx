"use client";

import React from "react";

const TermsAndConditions = () => {
    return (
        <div className="container mx-auto px-4 lg:px-1 my-20">
            {/* Page Title */}
            <h1 className="text-4xl font-bold text-center mb-10 text-gray-900">
                Terms and Conditions
            </h1>

            {/* Terms Section */}
            <div className="bg-gray-100 p-8 rounded-xl shadow-lg max-w-3xl mx-auto">
                <h2 className="text-2xl font-semibold text-red-600 mb-4">Introduction</h2>
                <p className="text-gray-700">
                    Welcome to <strong>Fit Life</strong>, a lifestyle and wellness platform dedicated to
                    providing valuable insights on fitness, beauty, health, home, and garden topics. These Terms and
                    Conditions outline the rules and guidelines for using our website.
                </p>

                <h2 className="text-2xl font-semibold text-red-600 mt-6 mb-4">Use of the Website</h2>
                <p className="text-gray-700">
                    <strong>Content Use:</strong> All content on our site is for informational purposes only. We strive to ensure accuracy,
                    but we cannot guarantee the completeness or reliability of the information.
                </p>
                <p className="text-gray-700 mt-2">
                    <strong>User Conduct:</strong> Users must not engage in any activity that could harm our site or its users, including
                    spamming, hacking, or distributing malware.
                </p>

                <h2 className="text-2xl font-semibold text-red-600 mt-6 mb-4">Intellectual Property</h2>
                <p className="text-gray-700">
                    <strong>Copyright:</strong> All content, including text, images, and videos, is protected by copyright. Unauthorized
                    use or reproduction is strictly prohibited.
                </p>
                <p className="text-gray-700 mt-2">
                    <strong>Trademarks:</strong> Our trademarks and those of third parties must be respected and not used without
                    permission.
                </p>

                <h2 className="text-2xl font-semibold text-red-600 mt-6 mb-4">Affiliate Links</h2>
                <p className="text-gray-700">
                    <strong>Amazon Affiliate Program:</strong> We participate in the Amazon Affiliate Program, which means we earn commissions
                    from qualifying purchases made through affiliate links on our site.
                </p>
                <p className="text-gray-700 mt-2">
                    <strong>Product Selection:</strong> Products are selected based on Amazon ratings and reviews. We do not personally
                    use these products but rely on publicly available information.
                </p>

                <h2 className="text-2xl font-semibold text-red-600 mt-6 mb-4">Disclaimer</h2>
                <p className="text-gray-700">
                    Our content is for informational purposes only and should not be considered professional advice. Always
                    consult a professional before making significant decisions based on our content.
                </p>

                <h2 className="text-2xl font-semibold text-red-600 mt-6 mb-4">Changes to Terms</h2>
                <p className="text-gray-700">
                    We reserve the right to modify these Terms and Conditions at any time. Your continued use of our site indicates
                    your acceptance of any changes.
                </p>

                <h2 className="text-2xl font-semibold text-red-600 mt-6 mb-4">Contact Information</h2>
                <p className="text-gray-700">
                    For questions or concerns, please contact us at <strong>daslams721@gmail.com</strong>.
                </p>
            </div>
        </div>
    );
};

export default TermsAndConditions;
