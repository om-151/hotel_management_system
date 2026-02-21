import { useState } from "react";
import API from "../api/axios";
import Swal from "sweetalert2";

const CONTACT_API = "http://localhost:5000/api/contacts";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("userToken");

    const validate = () => {
        let newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Full name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Enter a valid email address";
        }

        if (!formData.subject.trim()) {
            newErrors.subject = "Subject is required";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message cannot be empty";
        } else if (formData.message.length < 10) {
            newErrors.message = "Message must be at least 10 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        // remove error while typing
        setErrors({
            ...errors,
            [e.target.name]: "",
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            setLoading(true);

            await API.post(CONTACT_API, formData, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                },
            });

            Swal.fire({
                icon: "success",
                title: "Message Sent!",
                text: "Our team will contact you soon.",
                confirmButtonColor: "#d97706",
            });

            setFormData({
                name: "",
                email: "",
                subject: "",
                message: "",
            });

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">

            {/* Hero Section */}
            <div className="bg-gray-900 py-24 text-center text-white">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                    Let’s Talk
                </h1>
                <p className="text-gray-400 mt-4 max-w-lg mx-auto">
                    We’re here to assist you with bookings, support, and partnerships.
                </p>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-6 -mt-16 pb-20">
                <div className="grid md:grid-cols-2 bg-white shadow-2xl rounded-3xl overflow-hidden">

                    {/* Left Section */}
                    <div className="bg-amber-600 text-white p-12 flex flex-col justify-center space-y-6">
                        <h2 className="text-3xl font-semibold">
                            Contact Information
                        </h2>

                        <p className="text-amber-100 text-sm leading-relaxed">
                            Feel free to reach out for any queries. We usually
                            respond within 24 hours.
                        </p>

                        <div className="space-y-4 text-sm">
                            <p>📍 Surat, Gujarat, India</p>
                            <p>📞 +91 98765 43210</p>
                            <p>✉ support@maricuot.com</p>
                        </div>

                        <div className="pt-6 text-xs text-amber-200">
                            Secure communication · Trusted platform
                        </div>
                    </div>

                    {/* Right Section - Form */}
                    <div className="p-10 md:p-12">

                        <h2 className="text-2xl font-semibold text-gray-800 mb-8">
                            Send Us a Message
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full mt-2 px-4 py-3 rounded-xl border ${errors.name
                                        ? "border-red-500"
                                        : "border-gray-300"
                                        } focus:ring-2 focus:ring-amber-500 focus:outline-none transition`}
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full mt-2 px-4 py-3 rounded-xl border ${errors.email
                                        ? "border-red-500"
                                        : "border-gray-300"
                                        } focus:ring-2 focus:ring-amber-500 focus:outline-none transition`}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Subject */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className={`w-full mt-2 px-4 py-3 rounded-xl border ${errors.subject
                                        ? "border-red-500"
                                        : "border-gray-300"
                                        } focus:ring-2 focus:ring-amber-500 focus:outline-none transition`}
                                />
                                {errors.subject && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.subject}
                                    </p>
                                )}
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Message
                                </label>
                                <textarea
                                    rows="5"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className={`w-full mt-2 px-4 py-3 rounded-xl border resize-none ${errors.message
                                        ? "border-red-500"
                                        : "border-gray-300"
                                        } focus:ring-2 focus:ring-amber-500 focus:outline-none transition`}
                                ></textarea>
                                {errors.message && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.message}
                                    </p>
                                )}
                            </div>

                            {/* Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-xl font-semibold transition duration-300 hover:shadow-lg disabled:opacity-70"
                            >
                                {loading ? "Sending..." : "Send Message"}
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;