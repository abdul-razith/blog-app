import React from "react";

const Disclaimer = () => {
    return (
        <div className="container mx-auto px-4 lg:px-1 my-20 text-gray-900">
            <h1 className="text-4xl font-bold text-center mb-10">Disclaimer</h1>
            
            <div className="max-w-3xl mx-auto bg-gray-100 p-8 rounded-xl shadow-lg">
                {/* Introduction */}
                <section className="mb-6">
                    <h2 className="text-2xl font-bold mb-2 text-red-600">Introduction</h2>
                    <p>
                        Fit Life is an informational website focused on lifestyle and wellness topics.
                        The content provided is for general information purposes only and should not be considered as professional advice.
                    </p>
                </section>

                {/* Limitations of Liability */}
                <section className="mb-6">
                    <h2 className="text-2xl font-bold mb-2 text-red-600">Limitations of Liability</h2>
                    <p>
                        We strive to ensure the accuracy and completeness of our content, but we cannot guarantee its reliability.
                        Any reliance on the information provided is at your own risk.
                    </p>
                </section>

                {/* Affiliate Links */}
                <section className="mb-6">
                    <h2 className="text-2xl font-bold mb-2 text-red-600">Affiliate Links</h2>
                    <p>
                        Our site contains affiliate links, primarily from the Amazon Affiliate Program. These links help support our content creation efforts.
                    </p>
                </section>

                {/* Sponsored Content */}
                <section className="mb-6">
                    <h2 className="text-2xl font-bold mb-2 text-red-600">Sponsored Content</h2>
                    <p>
                        Occasionally, we may feature sponsored content or products recommended by influencers. These are clearly marked to maintain transparency.
                    </p>
                </section>

                {/* AI-Generated Content */}
                <section className="mb-6">
                    <h2 className="text-2xl font-bold mb-2 text-red-600">AI-Generated Content</h2>
                    <p>
                        While we utilize AI tools to assist in content creation, our focus is on providing valuable insights that enhance user knowledge.
                        We do not use AI to replace human judgment but rather to streamline our content development process.
                    </p>
                </section>

                {/* Legal Compliance */}
                <section className="mb-6">
                    <h2 className="text-2xl font-bold mb-2 text-red-600">Legal Compliance</h2>
                    <p>
                        We comply with all applicable laws and regulations regarding data privacy and advertising practices.
                    </p>
                </section>

                {/* Changes to Disclaimer */}
                <section className="mb-6">
                    <h2 className="text-2xl font-bold mb-2 text-red-600">Changes to Disclaimer</h2>
                    <p>
                        We reserve the right to update this Disclaimer at any time. Your continued use of our site indicates your acceptance of any changes.
                    </p>
                </section>

                {/* Contact Information */}
                <section>
                    <h2 className="text-2xl font-bold mb-2 text-red-600">Contact Information</h2>
                    <p>
                        For any questions or concerns, please contact us at <span className="font-bold">daslams721@gmail.com</span>.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Disclaimer;
