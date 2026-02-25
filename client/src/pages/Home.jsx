import { Wifi, Utensils, Plane, Dumbbell, Waves, Shirt, Users, AirVent, Monitor, Flame, ParkingCircle, ShieldCheck } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import Main from "../assets/main.png";
import Testimonials from "../reusable-component/Testimonials";

const services = [
    { name: "Free Wi-Fi", icon: Wifi },
    { name: "24/7 Room Service", icon: Users },
    { name: "Restaurant", icon: Utensils },
    { name: "Airport Pickup", icon: Plane },
    { name: "Laundry", icon: Shirt },
    { name: "Swimming Pool", icon: Waves },
    { name: "Fitness Center", icon: Dumbbell },
    { name: "AC", icon: AirVent },
    { name: "TV", icon: Monitor },
    { name: "Geyser", icon: Flame },
    { name: "Parking", icon: ParkingCircle },
    { name: "Security", icon: ShieldCheck },
];

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-white">

            {/* ================= HERO ================= */}
            <section className="relative h-screen">
                <img
                    src="https://img.freepik.com/premium-photo/hotels_883586-23307.jpg?w=740"
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
                                    Explore Rooms
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= SEARCH BAR ================= */}
            <section className="-mt-20 relative z-20 px-6 py-10">
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
                    <button onClick={() => navigate("/rooms")} className="bg-amber-600 text-white py-3 rounded-full hover:bg-amber-700 transition cursor-pointer">
                        Search Rooms
                    </button>
                </div>
            </section>

            {/* ================= SERVICES ================= */}
            <section className="py-5 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl font-semibold text-amber-600 text-center mb-16">Premium Services</h2>

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

            {/* ================= REVIEWS (AUTO SCROLL) ================= */}
            <Testimonials />

            <div className="w-full">
                <img
                    src={Main}
                    alt="Home Banner"
                    className="w-full object-cover"
                />
            </div>

        </div>
    );
};

export default Home;
