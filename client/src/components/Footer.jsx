import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-gray-950 to-gray-900 text-gray-300">

            {/* Top Border Accent */}
            <div className="h-[1px] bg-gradient-to-r from-transparent via-amber-600 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-3">

                {/* Brand Section */}
                <div>
                    <h2 className="text-3xl font-bold text-amber-600 tracking-wide">
                        Maricuot
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-gray-400">
                        A premium hotel management system designed to deliver
                        seamless bookings, luxury comfort, and unforgettable experiences.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                        Quick Links
                    </h3>
                    <ul className="space-y-3 text-sm">
                        {["Home", "Rooms", "Bookings", "Contact"].map((item) => (
                            <li
                                key={item}
                                className="cursor-pointer text-gray-400 hover:text-amber-600 transition duration-200"
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                        Contact Us
                    </h3>
                    <div className="space-y-3 text-sm text-gray-400">
                        <p>
                            <span className="text-amber-600 mr-2">📍</span>
                            Surat, India
                        </p>
                        <p>
                            <span className="text-amber-600 mr-2">📞</span>
                            +91 98765 43210
                        </p>
                        <p>
                            <span className="text-amber-600 mr-2">✉️</span>
                            support@maricuot.com
                        </p>
                    </div>
                </div>

            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 py-6 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} <span className="text-amber-600">Maricuot</span>. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
