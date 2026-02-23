import { useState } from "react";
import API from "../api/axios";
import Swal from "sweetalert2";
import {
    MapPin,
    Mail,
    Phone,
    Quote,
} from "lucide-react";
import contactImage from "../assets/contact-us.jpg";

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
        <div>

            {/* ================= TOP SECTION ================= */}
            <section className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">

                {/* Left Content */}
                <div>
                    <p className="text-amber-600 text-sm font-semibold tracking-widest uppercase">
                        Let’s Connect
                    </p>

                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 leading-tight">
                        Stay In Touch With Us
                    </h1>

                    <p className="text-gray-500 mt-6 max-w-lg">
                        We are here to help you with bookings, support,
                        and partnerships. Feel free to reach out anytime.
                    </p>

                    <div className="mt-10 space-y-8">

                        <div className="flex items-start gap-4">
                            <div className="bg-amber-100 text-amber-600 p-3 rounded-lg">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">Our Address</p>
                                <p className="text-sm text-gray-500">Surat, Gujarat, India</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-amber-100 text-amber-600 p-3 rounded-lg">
                                <Mail size={20} />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">Email Address</p>
                                <p className="text-sm text-gray-500">support@maricuot.com</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-amber-100 text-amber-600 p-3 rounded-lg">
                                <Phone size={20} />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">Telephone</p>
                                <p className="text-sm text-gray-500">+91 98765 43210</p>
                            </div>
                        </div>

                    </div>
                </div>


                {/* Right Image + Testimonial */}
                <div className="relative">
                    <img
                        src={contactImage}
                        alt="Contact"
                        className="rounded-2xl shadow-xl w-full h-[450px] object-cover"
                    />

                    <div className="absolute -bottom-8 -left-8 bg-amber-600 text-white p-6 rounded-xl shadow-2xl max-w-xs">
                        <Quote size={28} className="mb-3 opacity-80" />
                        <p className="text-sm leading-relaxed">
                            We prioritize customer satisfaction and respond
                            quickly to every inquiry.
                        </p>
                        <p className="mt-4 text-xs font-semibold tracking-wider">
                            MARICUOT TEAM
                        </p>
                    </div>
                </div>

            </section>



            {/* ================= MAP + FORM SECTION ================= */}
            <section className="max-w-7xl mx-auto px-6 pb-28">

                <div className="rounded-2xl p-5 md:p-10 grid lg:grid-cols-2 gap-12">

                    {/* Google Map */}
                    <div className="rounded-xl overflow-hidden h-[400px] shadow-md">
                        <iframe
                            title="Surat Map"
                            src="https://maps.google.com/maps?q=surat%20gujarat&t=&z=13&ie=UTF8&iwloc=&output=embed"
                            width="100%"
                            height="100%"
                            loading="lazy"
                            className="border-0"
                        ></iframe>
                    </div>


                    {/* Contact Form */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">
                            Contact us
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div className="grid md:grid-cols-2 gap-6">

                                {/* Name */}
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Full Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 rounded-lg border bg-gray-50 text-sm focus:outline-none focus:ring-2 ${errors.name
                                            ? "border-red-500 focus:ring-red-200"
                                            : "border-gray-200 focus:ring-amber-200 focus:border-amber-600"
                                            }`}
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-xs mt-2">{errors.name}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 rounded-lg border bg-gray-50 text-sm focus:outline-none focus:ring-2 ${errors.email
                                            ? "border-red-500 focus:ring-red-200"
                                            : "border-gray-200 focus:ring-amber-200 focus:border-amber-600"
                                            }`}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-xs mt-2">{errors.email}</p>
                                    )}
                                </div>

                            </div>

                            {/* Subject */}
                            <div>
                                <input
                                    type="text"
                                    name="subject"
                                    placeholder="Subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-lg border bg-gray-50 text-sm focus:outline-none focus:ring-2 ${errors.subject
                                        ? "border-red-500 focus:ring-red-200"
                                        : "border-gray-200 focus:ring-amber-200 focus:border-amber-600"
                                        }`}
                                />
                                {errors.subject && (
                                    <p className="text-red-500 text-xs mt-2">{errors.subject}</p>
                                )}
                            </div>

                            {/* Message */}
                            <div>
                                <textarea
                                    rows="5"
                                    name="message"
                                    placeholder="Write message..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-lg border bg-gray-50 text-sm resize-none focus:outline-none focus:ring-2 ${errors.message
                                        ? "border-red-500 focus:ring-red-200"
                                        : "border-gray-200 focus:ring-amber-200 focus:border-amber-600"
                                        }`}
                                ></textarea>
                                {errors.message && (
                                    <p className="text-red-500 text-xs mt-2">{errors.message}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-full font-semibold transition duration-300 shadow-md disabled:opacity-70 cursor-pointer"
                            >
                                {loading ? "Sending..." : "Send Message"}
                            </button>

                        </form>
                    </div>

                </div>
            </section>



            {/* ================= NEWSLETTER ================= */}
            <section className="bg-white pb-20">
                <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">

                    <h2 className="text-2xl font-bold text-gray-900">
                        Subscribe Our Newsletter
                    </h2>

                    <div className="flex w-full md:w-auto gap-4">
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-200 w-full md:w-80"
                        />
                        <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full font-semibold transition cursor-pointer">
                            Subscribe
                        </button>
                    </div>

                </div>
            </section>

        </div>
    );
};

export default Contact;