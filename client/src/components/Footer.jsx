import React from "react";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-white to-gray-100 text-gray-700">

            {/* Top Elegant Divider */}
            <div className="h-[3px] bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">

                {/* Brand Section */}
                <div className="space-y-5">
                    <h2 className="text-3xl font-bold text-amber-600 tracking-wide">
                        Maricuot
                    </h2>

                    <p className="text-sm leading-relaxed text-gray-600">
                        Experience comfort, elegance, and seamless room booking
                        designed for modern travelers and premium stays.
                    </p>

                    {/* Social Icons */}
                    <div className="flex gap-4 pt-2">
                        {[Facebook, Instagram, Twitter].map((Icon, i) => (
                            <div
                                key={i}
                                className="p-2 rounded-full bg-white shadow-md hover:bg-amber-500 hover:text-white transition cursor-pointer"
                            >
                                <Icon size={18} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">
                        Quick Links
                    </h3>

                    <ul className="space-y-3 text-sm">
                        {[
                            { name: "Home", path: "/" },
                            { name: "Rooms", path: "/rooms" },
                            { name: "My Bookings", path: "/booking" },
                            { name: "Services", path: "/services" },
                            { name: "Contact", path: "/contact" },
                        ].map((item) => (
                            <li key={item.name}>
                                <Link
                                    to={item.path}
                                    className="text-gray-600 hover:text-amber-600 transition duration-200"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Services */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">
                        Services
                    </h3>

                    <ul className="space-y-3 text-sm text-gray-600">
                        <li>Luxury Rooms</li>
                        <li>Restaurant & Bar</li>
                        <li>Spa & Wellness</li>
                        <li>24/7 Room Service</li>
                        <li>Free Wi-Fi</li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">
                        Contact
                    </h3>

                    <div className="space-y-4 text-sm text-gray-600">

                        <div className="flex items-start gap-3">
                            <MapPin size={18} className="text-amber-600 mt-1" />
                            <p>Surat, Gujarat, India</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <Phone size={18} className="text-amber-600" />
                            <p>+91 98765 43210</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <Mail size={18} className="text-amber-600" />
                            <p>support@maricuot.com</p>
                        </div>

                    </div>
                </div>

            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 gap-3">

                    <p>
                        © {new Date().getFullYear()}{" "}
                        <span className="text-amber-600 font-semibold">
                            Maricuot
                        </span>. All rights reserved.
                    </p>

                    <div className="flex gap-6">
                        <span className="hover:text-amber-600 cursor-pointer transition">
                            Privacy Policy
                        </span>
                        <span className="hover:text-amber-600 cursor-pointer transition">
                            Terms & Conditions
                        </span>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;