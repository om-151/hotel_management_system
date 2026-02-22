import { useEffect, useRef, useState } from "react";
import { BedDouble, CalendarCheck, CreditCard, BarChart3, Users, Headphones, Target, Globe } from "lucide-react";

const AboutServices = () => {
  const useCounter = (end, duration = 2000) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const [start, setStart] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setStart(true);
            observer.disconnect();
          }
        },
        { threshold: 0.3 }
      );

      if (ref.current) observer.observe(ref.current);

      return () => observer.disconnect();
    }, []);

    useEffect(() => {
      if (!start) return;

      let startTime;
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);
        setCount(Math.floor(percentage * end));

        if (percentage < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, [start, end, duration]);

    return { count, ref };
  };

  const services = [
    {
      title: "Room & Inventory Control",
      desc: "Real-time availability, pricing automation, and occupancy insights.",
      icon: <BedDouble size={28} />,
    },
    {
      title: "Online Booking Engine",
      desc: "Mobile-first booking experience with instant confirmations.",
      icon: <CalendarCheck size={28} />,
    },
    {
      title: "Secure Payment System",
      desc: "Integrated payment gateways with safe transaction processing.",
      icon: <CreditCard size={28} />,
    },
    {
      title: "Guest Experience Tools",
      desc: "Automated emails, service requests, and seamless guest journey.",
      icon: <Users size={28} />,
    },
    {
      title: "Business Analytics",
      desc: "Revenue tracking, occupancy trends, and performance dashboards.",
      icon: <BarChart3 size={28} />,
    },
    {
      title: "24/7 Dedicated Support",
      desc: "Round-the-clock assistance for hotels and guests.",
      icon: <Headphones size={28} />,
    },
  ];

  return (
    <section className="bg-white text-gray-900">

      {/* ================= HERO ================= */}
      <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-6 pt-28 pb-32">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div>
              <span className="text-sm font-semibold tracking-widest text-amber-600 uppercase">
                About Maricuot
              </span>

              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                A smarter way to manage
                <span className="text-amber-600"> modern hotels</span>
              </h1>

              <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl">
                Maricuot empowers hospitality businesses with automation,
                performance insights, and seamless guest experiences — all
                delivered through a clean and intuitive system.
              </p>

              {/* Metrics */}
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-2xl lg:max-w-none">
                {[
                  { value: 150, suffix: "+", label: "Rooms" },
                  { value: 8000, suffix: "+", label: "Guests" },
                  { value: 25, suffix: "+", label: "Cities" },
                ].map((item) => {
                  const { count, ref } = useCounter(item.value);

                  return (
                    <div
                      key={item.label}
                      ref={ref}
                      className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl p-6 sm:p-8 text-center shadow-sm hover:shadow-md transition"
                    >
                      <p className="text-2xl sm:text-3xl font-bold text-amber-600 break-words">
                        {item.label === "Guests"
                          ? count.toLocaleString()
                          : count}
                        {item.suffix}
                      </p>

                      <p className="text-sm sm:text-base text-gray-500 mt-2">
                        {item.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative">
              <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100">
                <h3 className="text-2xl font-semibold mb-6">
                  Why Choose Maricuot?
                </h3>

                <ul className="space-y-5 text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="text-amber-600 mt-1">✔</span>
                    Built specifically for real-world hotel workflows
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-600 mt-1">✔</span>
                    Fast, scalable, and secure architecture
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-600 mt-1">✔</span>
                    Simplified operations with automation tools
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-600 mt-1">✔</span>
                    Designed for growth and long-term success
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ================= SERVICES ================= */}
      <div className="py-5 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">

          {/* Cards */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="group bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-amber-100 text-amber-600 mb-6 group-hover:bg-amber-600 group-hover:text-white transition">
                  {service.icon}
                </div>

                <h3 className="text-xl font-semibold mb-3">
                  {service.title}
                </h3>

                <p className="text-gray-600 leading-relaxed text-sm">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= MISSION & VISION ================= */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-sm font-semibold tracking-widest text-amber-600 uppercase">
              Our Purpose
            </span>
            <h2 className="mt-5 text-4xl font-bold">
              Driving the Future of Hospitality
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              We are committed to transforming hotel management through
              innovation, automation, and seamless digital experiences.
            </p>
          </div>

          {/* Content */}
          <div className="grid md:grid-cols-2 gap-12">

            {/* Mission */}
            <div className="group bg-gray-50 border border-gray-200 rounded-3xl p-10 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-amber-100 text-amber-600 mb-6 group-hover:bg-amber-600 group-hover:text-white transition">
                <Target size={26} />
              </div>

              <h3 className="text-2xl font-semibold mb-4">
                Our Mission
              </h3>

              <p className="text-gray-600 leading-relaxed">
                To empower hotels and hospitality businesses with intelligent
                management tools that simplify operations, increase efficiency,
                and enhance guest satisfaction through modern technology.
              </p>
            </div>

            {/* Vision */}
            <div className="group bg-gray-50 border border-gray-200 rounded-3xl p-10 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-amber-100 text-amber-600 mb-6 group-hover:bg-amber-600 group-hover:text-white transition">
                <Globe size={26} />
              </div>

              <h3 className="text-2xl font-semibold mb-4">
                Our Vision
              </h3>

              <p className="text-gray-600 leading-relaxed">
                To become the most trusted and innovative hotel management
                platform globally, helping hospitality brands scale seamlessly
                while delivering exceptional experiences to every guest.
              </p>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
};

export default AboutServices;