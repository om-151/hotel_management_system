import React from "react";

const AboutServices = () => {
  return (
    <section className="relative bg-[#f8fafc] text-gray-900 overflow-hidden">

      {/* Background accents */}
      <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-r from-amber-500/10 to-transparent"></div>
      <div className="absolute -right-40 top-40 w-[500px] h-[500px] bg-amber-400/20 rounded-full blur-[120px]"></div>

      {/* ================= ABOUT ================= */}
      <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Text */}
          <div>
            <span className="inline-block mb-4 text-sm font-semibold tracking-widest text-amber-600 uppercase">
              About Maricuot
            </span>

            <h1 className="text-5xl leading-tight font-bold mb-6">
              A Smarter Way to  
              <span className="text-amber-600"> Manage Hotels</span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed mb-10">
              Maricuot is a next-generation hotel management platform built for
              modern hospitality businesses. We focus on performance,
              automation, and guest satisfaction — all delivered through a
              simple and elegant system.
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: "150+", label: "Hotels" },
                { value: "10K+", label: "Guests" },
                { value: "25+", label: "Cities" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white rounded-xl shadow-md p-5 text-center"
                >
                  <p className="text-3xl font-bold text-amber-600">
                    {item.value}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Card */}
          <div className="relative">
            <div className="bg-white rounded-3xl shadow-xl p-10 border border-gray-200">
              <h3 className="text-2xl font-semibold mb-4">
                Why Maricuot?
              </h3>
              <ul className="space-y-4 text-gray-600 text-sm leading-relaxed">
                <li>✔ Designed for modern hotels & resorts</li>
                <li>✔ Fast, secure, and scalable architecture</li>
                <li>✔ Seamless guest experience</li>
                <li>✔ Built with real-world hotel workflows</li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* ================= SERVICES ================= */}
      <div className="relative bg-white py-32">
        <div className="max-w-7xl mx-auto px-6">

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-24">
            <span className="text-sm font-semibold tracking-widest text-amber-600 uppercase">
              Services
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              Built for Growth,  
              Designed for Comfort
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Everything you need to operate efficiently, scale faster, and
              deliver exceptional hospitality.
            </p>
          </div>

          {/* Service Cards */}
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Room & Inventory Control",
                desc: "Real-time room availability, pricing control, and occupancy tracking.",
                icon: "🛏️",
              },
              {
                title: "Online Booking Engine",
                desc: "Fast, secure, and mobile-friendly booking experience.",
                icon: "📅",
              },
              {
                title: "Payment Integration",
                desc: "Safe and seamless online transactions with trusted gateways.",
                icon: "💳",
              },
              {
                title: "Guest Experience Tools",
                desc: "Automated confirmations, notifications, and service requests.",
                icon: "🤝",
              },
              {
                title: "Business Analytics",
                desc: "Detailed reports to monitor revenue, occupancy, and performance.",
                icon: "📊",
              },
              {
                title: "Dedicated Support",
                desc: "24/7 assistance for hotels and guests whenever needed.",
                icon: "🛎️",
              },
            ].map((service) => (
              <div
                key={service.title}
                className="group bg-[#f8fafc] border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl mb-5">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-amber-600 transition">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutServices;
