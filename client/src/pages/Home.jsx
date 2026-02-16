import React from "react";
import { Wifi, Utensils, Plane, Dumbbell, Waves, Shirt, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Main from "../assets/main.png";

const reviews = [
    {
        id: 1,
        name: "Rahul Sharma",
        rating: 5,
        text: "Exceptional stay! Clean rooms, friendly staff, and great food.",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        id: 2,
        name: "Ananya Verma",
        rating: 4.8,
        text: "Loved the ambience and hospitality. Will visit again.",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        id: 3,
        name: "Arjun Mehta",
        rating: 5,
        text: "Perfect location and very comfortable rooms.",
        image: "https://randomuser.me/api/portraits/men/65.jpg",
    },
    {
        id: 4,
        name: "Sneha Kapoor",
        rating: 4.9,
        text: "Smooth booking experience and amazing service.",
        image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
];

const services = [
    { name: "Free Wi-Fi", icon: Wifi },
    { name: "24/7 Room Service", icon: Users },
    { name: "Restaurant", icon: Utensils },
    { name: "Airport Pickup", icon: Plane },
    { name: "Laundry", icon: Shirt },
    { name: "Swimming Pool", icon: Waves },
    { name: "Fitness Center", icon: Dumbbell },
];

const Home = () => {
    return (
        <div className="bg-white">

            {/* ================= HERO ================= */}
            <section className="relative h-screen">
                <img
                    src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
                    alt="Hotel"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10"></div>

                <div className="relative z-10 h-full flex items-center px-6 lg:px-24">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl text-white lg:text-6xl font-semibold leading-tight">
                            Experience Comfort <br /> Like Never Before
                        </h1>
                        <p className="text-lg text-gray-300 mt-6">
                            Luxury rooms, premium services, and seamless booking
                            for your perfect stay.
                        </p>

                        <div className="flex gap-6 mt-10">
                            <Link to="/rooms">
                                <button className="bg-amber-600 text-white px-8 py-3 rounded-full hover:bg-amber-700 transition cursor-pointer font-semibold">
                                    Book Now
                                </button>
                            </Link>
                            <Link to="/rooms">
                                <button className="bg-amber-600 text-white px-8 py-3 rounded-full hover:bg-amber-700 transition cursor-pointer font-semibold">
                                    Explore Rooms
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= SEARCH BAR ================= */}
            <section className="-mt-20 relative z-20 px-6">
                <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl p-6 grid md:grid-cols-4 gap-6 items-end">
                    <div>
                        <label className="text-sm text-gray-500">Check-in</label>
                        <input type="date" className="w-full mt-2 border-b outline-none" />
                    </div>
                    <div>
                        <label className="text-sm text-gray-500">Check-out</label>
                        <input type="date" className="w-full mt-2 border-b outline-none" />
                    </div>
                    <div>
                        <label className="text-sm text-gray-500">Guests</label>
                        <select className="w-full mt-2 border-b outline-none">
                            <option>1 Adult</option>
                            <option>2 Adults</option>
                            <option>3 Adults</option>
                            <option>4+ Adults</option>
                        </select>
                    </div>
                    <button className="bg-amber-600 text-white py-3 rounded-full hover:bg-amber-700 transition cursor-pointer">
                        Search Rooms
                    </button>
                </div>
            </section>

            {/* ================= COUNTERS ================= */}
            <section className="py-24">
                <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
                    <div>
                        <h3 className="text-4xl font-bold text-amber-600">15K+</h3>
                        <p className="text-gray-600 mt-2">Happy Customers</p>
                    </div>
                    <div>
                        <h3 className="text-4xl font-bold text-amber-600">4.9★</h3>
                        <p className="text-gray-600 mt-2">Average Rating</p>
                    </div>
                    <div>
                        <h3 className="text-4xl font-bold text-amber-600">320+</h3>
                        <p className="text-gray-600 mt-2">Luxury Rooms</p>
                    </div>
                    <div>
                        <h3 className="text-4xl font-bold text-amber-600">Since 2010</h3>
                        <p className="text-gray-600 mt-2">Trusted Since</p>
                    </div>
                </div>
            </section>

            {/* ================= REVIEWS (AUTO SCROLL) ================= */}
            <section className="py-24 bg-gray-50 overflow-hidden">
                <h2 className="text-4xl font-semibold text-center mb-12">
                    What Our Guests Say
                </h2>

                <div className="relative">
                    <div className="flex gap-8 animate-scroll hover:[animation-play-state:paused] px-6">
                        {[...reviews, ...reviews].map((review, index) => (
                            <div
                                key={index}
                                className="min-w-[320px] bg-white p-6 rounded-2xl shadow"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <img
                                        src={review.image}
                                        alt={review.name}
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <div>
                                        <h4 className="font-medium">{review.name}</h4>
                                        <p className="text-sm text-amber-600">
                                            ★ {review.rating}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm">
                                    {review.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= SERVICES ================= */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl font-semibold text-center mb-16">Premium Services</h2>

                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {services.map((service, i) => {
                            const Icon = service.icon;
                            return (
                                <div key={i} className="bg-white rounded-2xl p-8 text-center shadow hover:shadow-xl transition">
                                    <Icon className="mx-auto text-amber-600 mb-4" size={36} />
                                    <p className="font-semibold">{service.name}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <div className="w-full">
                <img
                    src={Main}
                    alt="Home Banner"
                    className="w-full object-cover"
                />
            </div>

            {/* CTA */}
            <section className="py-24 bg-gradient-to-r from-amber-600 to-amber-700 text-white">
                <div className="max-w-5xl mx-auto text-center px-6">
                    <h2 className="text-4xl font-bold">Ready for a Luxury Experience?</h2>
                    <p className="mt-4 text-white/90">Book your stay today and enjoy premium hospitality like never before.</p>

                    <Link to="/rooms" className="inline-block mt-8 bg-white text-amber-700 px-10 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-100 transition">
                        View Rooms
                    </Link>
                </div>
            </section>

            {/* Animation style */}
            <style>
                {`
                    @keyframes scroll {
                        from { transform: translateX(0); }
                        to { transform: translateX(-50%); }
                    }
                    .animate-scroll {
                        animation: scroll 30s linear infinite;
                    }
                `}
            </style>

        </div>
    );
};

export default Home;
