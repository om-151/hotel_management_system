import React from "react";

const Contact = () => {
    return (
        <div className="min-h-screen bg-gray-50">

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-20 text-center text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Contact Us
                </h1>
                <p className="text-gray-300 max-w-xl mx-auto">
                    Have questions or need support? We’re here to help you anytime.
                </p>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-2">

                {/* Left - Contact Info */}
                <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
                    <h2 className="text-2xl font-semibold text-gray-900">
                        Get in Touch
                    </h2>
                    <p className="text-gray-500">
                        Reach out to us for bookings, queries, or support.
                        Our team responds within 24 hours.
                    </p>

                    <div className="space-y-4 text-sm text-gray-600">
                        <p>
                            <span className="font-medium text-gray-900">📍 Address:</span>{" "}
                            Surat, Gujarat, India
                        </p>
                        <p>
                            <span className="font-medium text-gray-900">📞 Phone:</span>{" "}
                            +91 98765 43210
                        </p>
                        <p>
                            <span className="font-medium text-gray-900">✉️ Email:</span>{" "}
                            support@maricuot.com
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="h-[1px] bg-gray-200 my-6" />

                    {/* Trust */}
                    <p className="text-sm text-gray-500">
                        ✔ Trusted by hotels & guests across India
                        <br />
                        ✔ Secure communication
                    </p>
                </div>

                {/* Right - Contact Form */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                        Send a Message
                    </h2>

                    <form className="space-y-5">
                        <div>
                            <label className="text-sm text-gray-600">Full Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600">Email Address</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600">Message</label>
                            <textarea
                                rows="5"
                                placeholder="Write your message here..."
                                className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 resize-none"
                            ></textarea>
                        </div>

                        <button
                            type="button"
                            className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-xl font-semibold transition"
                        >
                            Send Message
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Contact;
