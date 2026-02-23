import React from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
    {
        id: 1,
        name: "Rohan Mehta",
        role: "Business Professional",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 5,
        review:
            "The experience was seamless from check-in to check-out. The attention to detail, cleanliness, and service quality truly stood out. I’ve stayed in many premium hotels, but this property delivers comfort and professionalism at another level. Highly recommended for business and leisure stays.",
    },
    {
        id: 2,
        name: "Priya Sharma",
        role: "Travel Blogger",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 5,
        review:
            "A beautifully designed hotel with exceptional service standards. The ambience feels calm and luxurious, and every staff member ensures guests feel valued. The rooms were modern, spacious, and incredibly comfortable. I genuinely enjoyed my stay.",
    },
    {
        id: 3,
        name: "Amit Patel",
        role: "Entrepreneur",
        image: "https://randomuser.me/api/portraits/men/76.jpg",
        rating: 4,
        review:
            "Professional service, elegant interiors, and well-maintained facilities. The overall hospitality experience was impressive. It’s the kind of place you confidently recommend to colleagues and family.",
    },
];

const Testimonials = () => {
    return (
        <section className="py-32 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-20">
                    <h2 className="text-4xl font-semibold text-gray-900 tracking-tight">
                        What Our Guests Say
                    </h2>
                </div>

                {/* Infinite Scroll */}
                <div className="relative group">
                    <div className="flex gap-16 animate-marquee group-hover:[animation-play-state:paused]">
                        {[...testimonials, ...testimonials].map((item, index) => (
                            <div
                                key={index}
                                className="min-w-[520px] max-w-[520px] bg-gray-50 rounded-2xl p-12 transition"
                            >
                                {/* Quote Icon */}
                                <Quote className="w-8 h-8 text-gray-300 mb-6" />

                                {/* Review */}
                                <p className="text-gray-700 text-lg leading-relaxed mb-10">
                                    {item.review}
                                </p>

                                {/* User Info */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-14 h-14 rounded-full object-cover"
                                        />
                                        <div>
                                            <h4 className="font-medium text-gray-900 text-lg">
                                                {item.name}
                                            </h4>
                                            <p className="text-sm text-gray-500">{item.role}</p>
                                        </div>
                                    </div>

                                    {/* Rating */}
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < item.rating
                                                        ? "text-amber-600 fill-amber-600"
                                                        : "text-amber-500"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;