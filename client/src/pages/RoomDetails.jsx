import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import API from "../api/axios";
import { DateRange } from "react-date-range";
import { format, differenceInDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { createPortal } from "react-dom";

const RoomDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const IMAGE_BASE = "http://localhost:5000/";

    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);
    const [showCalendar, setShowCalendar] = useState(false);
    // Lightbox State
    const [selectedIndex, setSelectedIndex] = useState(null);

    useEffect(() => {
        API.get(`/rooms/${id}`)
            .then((res) => {
                setRoom(res.data.room);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    const handleBooking = async () => {
        if (nights <= 0) {
            alert("Please select valid check-in and check-out dates");
            return;
        }

        try {
            await API.post("/bookings", {
                roomId: id,
                check_in_date: dateRange[0].startDate,
                check_out_date: dateRange[0].endDate,
            });

            alert("Booking Confirmed 🎉");
            navigate("/my-bookings");
        } catch (error) {
            console.error(error);
            alert("Booking failed");
        }
    };

    const images = room?.images?.map(img => IMAGE_BASE + img) || [];

    const prevImage = () => {
        setSelectedIndex(prev =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    };

    const nextImage = () => {
        setSelectedIndex(prev =>
            prev === images.length - 1 ? 0 : prev + 1
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    const nights = Math.max(
        0,
        differenceInDays(
            dateRange[0].endDate,
            dateRange[0].startDate
        )
    );

    if (!room) return <div>Room not found</div>;
    const discount = nights >= 5 ? 10 : 0;
    const totalPrice = nights * (room?.price || 0);
    const finalPrice =
        totalPrice - (totalPrice * discount) / 100;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6 mt-5">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">

                {/* LEFT SIDE */}
                <div className="lg:col-span-2 space-y-8">

                    {/* ===== PERFECT RESPONSIVE GALLERY ===== */}
                    {images.length > 0 && (
                        <div className="space-y-4">

                            {/* Main Featured Image */}
                            <div
                                className="w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-3xl overflow-hidden cursor-pointer group"
                                onClick={() => setSelectedIndex(0)}
                            >
                                <img
                                    src={images[0]}
                                    alt="room"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>

                            {/* Thumbnail Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {images.slice(1).map((img, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setSelectedIndex(index + 1)}
                                        className="aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group"
                                    >
                                        <img
                                            src={img}
                                            alt="room"
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* BASIC INFO */}
                    <div className="bg-white p-6 rounded-2xl shadow">
                        <h1 className="text-3xl font-bold mb-2 capitalize">
                            {room.name}
                        </h1>

                        <p className="text-gray-500 mb-3">
                            📍 {room.city}, {room.state}
                        </p>

                        <div className="flex items-center gap-2 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <span
                                    key={i}
                                    className={`text-xl ${i < Math.round(room.rating)
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                        }`}
                                >
                                    ★
                                </span>
                            ))}
                            <span className="text-gray-600 ml-2">
                                {room.rating} / 5
                            </span>
                        </div>

                        <p className="text-gray-700 leading-relaxed">
                            {room.room_desc}
                        </p>
                    </div>

                    {/* AMENITIES SECTION */}
                    <div className="bg-white p-6 rounded-2xl shadow">
                        <h2 className="text-xl font-semibold mb-4">
                            Amenities
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-700">
                            <div>❄️ AC</div>
                            <div>📶 Free Wi-Fi</div>
                            <div>📺 TV</div>
                            <div>🔥 Geyser</div>
                            <div>🔌 Power Backup</div>
                            <div>🧹 Daily Housekeeping</div>
                            <div>🚗 Parking</div>
                        </div>
                    </div>

                </div>

                {/* RIGHT SIDE BOOKING CARD */}
                <div className="bg-white p-6 rounded-2xl shadow sticky top-24 h-fit space-y-6">

                    <div>
                        <p className="text-3xl font-bold text-amber-600">
                            ₹{room.price}
                            <span className="text-base text-gray-500 font-normal">
                                {" "} / night
                            </span>
                        </p>
                        <p className="text-md line-through my-1">₹{room.base_price}</p>
                    </div>

                    {/* DATE SELECTOR */}
                    <div
                        onClick={() => setShowCalendar(true)}
                        className="border rounded-xl p-4 cursor-pointer hover:shadow-md transition"
                    >
                        <div className="flex justify-between text-sm">
                            <div>
                                <p className="text-gray-400">Check-in</p>
                                <p className="font-semibold">
                                    {format(dateRange[0].startDate, "dd MMM yyyy")}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-400">Check-out</p>
                                <p className="font-semibold">
                                    {format(dateRange[0].endDate, "dd MMM yyyy")}
                                </p>
                            </div>
                        </div>

                        {nights > 0 && (
                            <p className="mt-3 text-sm bg-amber-100 text-amber-700 inline-block px-3 py-1 rounded-full">
                                {nights} nights
                            </p>
                        )}
                    </div>

                    {/* PRICE BREAKDOWN */}
                    {nights > 0 && (
                        <div className="bg-gray-50 p-4 rounded-xl text-sm space-y-2">
                            <div className="flex justify-between">
                                <span>{nights} nights</span>
                                <span>₹{totalPrice}</span>
                            </div>

                            {discount > 0 && (
                                <div className="flex justify-between text-green-600">
                                    <span>{discount}% discount</span>
                                    <span>-₹{(totalPrice * discount) / 100}</span>
                                </div>
                            )}

                            <div className="flex justify-between font-semibold border-t pt-2 text-lg">
                                <span>Total</span>
                                <span>₹{finalPrice}</span>
                            </div>
                        </div>
                    )}

                    <button
                        disabled={!room.availability}
                        onClick={handleBooking}
                        className={`w-full py-3 rounded-xl font-semibold transition ${room.availability
                            ? "bg-amber-600 text-white hover:bg-amber-700 cursor-pointer"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                    >
                        Confirm Booking
                    </button>
                </div>

                {/* ================= FLOATING CALENDAR (PORTAL FIX) ================= */}
                {showCalendar &&
                    createPortal(
                        <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-start pt-24">
                            <div className="bg-white rounded-2xl shadow-2xl p-6 relative">
                                <button
                                    onClick={() => setShowCalendar(false)}
                                    className="absolute top-4 right-4 cursor-pointer"
                                >
                                    <X size={22} />
                                </button>

                                <DateRange
                                    editableDateInputs
                                    onChange={(item) =>
                                        setDateRange([item.selection])
                                    }
                                    moveRangeOnFirstSelection={false}
                                    ranges={dateRange}
                                    minDate={new Date()}
                                    months={2}
                                    direction="horizontal"
                                />
                            </div>
                        </div>,
                        document.body
                    )}
            </div>

            {/* ===== FULLSCREEN LIGHTBOX ===== */}
            {selectedIndex !== null && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                    <button
                        onClick={() => setSelectedIndex(null)}
                        className="absolute top-6 right-6 text-white cursor-pointer"
                    >
                        <X size={32} />
                    </button>

                    <button
                        onClick={prevImage}
                        className="absolute left-6 text-white cursor-pointer"
                    >
                        <ChevronLeft size={40} />
                    </button>

                    <img
                        src={images[selectedIndex]}
                        alt="room-large"
                        className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-lg"
                    />

                    <button
                        onClick={nextImage}
                        className="absolute right-6 text-white cursor-pointer"
                    >
                        <ChevronRight size={40} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default RoomDetails;
