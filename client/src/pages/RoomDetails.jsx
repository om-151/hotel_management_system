import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import API from "../api/axios";
import { DateRange } from "react-date-range";
import { format, differenceInDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { createPortal } from "react-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const RoomDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const IMAGE_BASE = "http://localhost:5000/";
    const MySwal = withReactContent(Swal);

    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [disabledDates, setDisabledDates] = useState([]);
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);
    const [rooms, setRooms] = useState(1);
    const [guests, setGuests] = useState(1);

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [countryCode, setCountryCode] = useState("+91");
    const [phone, setPhone] = useState("");
    const [errors, setErrors] = useState({});
    const [showCalendar, setShowCalendar] = useState(false);
    // Lightbox State
    const [selectedIndex, setSelectedIndex] = useState(null);

    useEffect(() => {
        API.get(`/rooms/${id}`)
            .then((res) => {
                setRoom(res.data.room);
                setLoading(false);
            })
            .catch((err) => console.error(err));
    }, [id]);

    useEffect(() => {
        API.get(`/bookings/room/${id}`)
            .then((res) => {
                const bookedDates = res.data.bookings.flatMap((booking) => {
                    const start = new Date(booking.check_in_date);
                    const end = new Date(booking.check_out_date);

                    const dates = [];
                    let current = new Date(start);

                    while (current <= end) {
                        dates.push(new Date(current));
                        current.setDate(current.getDate() + 1);
                    }

                    return dates;
                });

                setDisabledDates(bookedDates);
            })
            .catch((err) => console.error(err));
    }, [id]);

    const handleBooking = async () => {
        let newErrors = {};

        if (nights <= 0) {
            MySwal.fire({
                icon: "warning",
                title: "Invalid Dates",
                text: "Please select valid check-in and check-out dates.",
                confirmButtonColor: "#d97706",
            });
            return;
        }

        if (rooms > 3) {
            newErrors.rooms = "Maximum 3 rooms allowed per reservation";
        }

        if (guests > rooms * 3) {
            newErrors.guests = `Maximum ${rooms * 3} guests allowed for ${rooms} room(s)`;
        }

        if (!fullName.trim()) {
            newErrors.fullName = "Full name is required";
        } else if (fullName.trim().length < 3) {
            newErrors.fullName = "Full name must be at least 3 characters";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(email)) {
            newErrors.email = "Enter a valid email address";
        }

        const phoneRegex = /^[0-9]{8,12}$/;
        if (!phone) {
            newErrors.phone = "Mobile number is required";
        } else if (!phoneRegex.test(phone)) {
            newErrors.phone = "Enter valid mobile number";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);

            MySwal.fire({
                icon: "error",
                title: "Validation Error",
                text: "Please fix the highlighted fields before continuing.",
                confirmButtonColor: "#d97706",
            });

            return;
        }

        setErrors({});

        try {
            // Loading Alert
            MySwal.fire({
                title: "Processing Booking...",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });

            await API.post("/bookings", {
                roomId: id,
                check_in_date: dateRange[0].startDate,
                check_out_date: dateRange[0].endDate,
                numberOfRooms: rooms,
                numberOfGuests: guests,
            });

            Swal.close();

            MySwal.fire({
                icon: "success",
                title: "Booking Confirmed!",
                text: "Your reservation has been successfully created.",
                confirmButtonColor: "#d97706",
            }).then(() => {
                navigate("/booking");
            });

        } catch (error) {
            Swal.close();

            MySwal.fire({
                icon: "error",
                title: "Booking Failed",
                text: "Something went wrong. Please try again.",
                confirmButtonColor: "#dc2626",
            });
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
                <div className="sticky top-24 h-fit">
                    <div className="bg-white rounded-3xl shadow-xl p-8 space-y-6 border border-gray-100">

                        <p className="font-semibold text-2xl">Booking summary</p>

                        {/* PRICE HEADER */}
                        <div>
                            <h2 className="text-3xl font-bold text-amber-600">
                                ₹{room.price}
                                <span className="text-base text-gray-400 font-normal"> /night</span>
                            </h2>
                            <p className="text-gray-400 line-through">₹{room.base_price}</p>
                        </div>

                        {/* DATE SELECTOR */}
                        <div
                            onClick={() => setShowCalendar(true)}
                            className="border rounded-2xl p-4 cursor-pointer hover:border-amber-500 transition"
                        >
                            <div className="flex justify-between text-sm">
                                <div>
                                    <p className="text-gray-400 text-xs">Check-in</p>
                                    <p className="font-semibold">
                                        {format(dateRange[0].startDate, "dd MMM yyyy")}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs">Check-out</p>
                                    <p className="font-semibold">
                                        {format(dateRange[0].endDate, "dd MMM yyyy")}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* ROOMS & GUESTS */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* ROOMS */}
                            <div>
                                <label className="text-xs text-gray-500">Rooms (max 3)</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="3"
                                    value={rooms}
                                    onChange={(e) => {
                                        const value = Number(e.target.value);
                                        if (value <= 3) setRooms(value);
                                    }}
                                    className="w-full border rounded-xl px-3 py-2 mt-1"
                                />
                                {errors.rooms && (
                                    <p className="text-red-500 text-xs mt-1">{errors.rooms}</p>
                                )}
                            </div>

                            {/* GUESTS */}
                            <div>
                                <label className="text-xs text-gray-500">
                                    Guests (max 3 per room)
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    value={guests}
                                    onChange={(e) => {
                                        const value = Number(e.target.value);
                                        setGuests(value);
                                    }}
                                    className="w-full border rounded-xl px-3 py-2 mt-1"
                                />
                                {errors.guests && (
                                    <p className="text-red-500 text-xs mt-1">{errors.guests}</p>
                                )}
                            </div>
                        </div>

                        {/* USER DETAILS */}
                        <div className="space-y-3 pt-5">

                            <h3 className="font-semibold text-lg">Guest Information</h3>

                            <input
                                type="text"
                                placeholder="Full Name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full border rounded-xl px-4 py-3"
                            />
                            {errors.fullName && (
                                <p className="text-red-500 text-xs">{errors.fullName}</p>
                            )}

                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border rounded-xl px-4 py-3"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs">{errors.email}</p>
                            )}

                            <div className="flex gap-2">
                                <select
                                    value={countryCode}
                                    onChange={(e) => setCountryCode(e.target.value)}
                                    className="border rounded-xl px-3 py-3"
                                >
                                    <option value="+91">🇮🇳 +91</option>
                                    <option value="+1">🇺🇸 +1</option>
                                    <option value="+44">🇬🇧 +44</option>
                                    <option value="+971">🇦🇪 +971</option>
                                </select>

                                <input
                                    type="tel"
                                    placeholder="Mobile Number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full border rounded-xl px-4 py-3"
                                />
                            </div>
                            {errors.phone && (
                                <p className="text-red-500 text-xs">{errors.phone}</p>
                            )}
                        </div>

                        {/* PRICE BREAKDOWN */}
                        {nights > 0 && (
                            <div className="bg-gray-50 p-5 rounded-2xl space-y-3 text-sm border">

                                <div className="flex justify-between">
                                    <span>{rooms} rooms × {nights} nights</span>
                                    <span>₹{totalPrice * rooms}</span>
                                </div>

                                {discount > 0 && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Discount ({discount}%)</span>
                                        <span>-₹{((totalPrice * rooms) * discount) / 100}</span>
                                    </div>
                                )}

                                <div className="border-t pt-3 flex justify-between font-bold text-lg">
                                    <span>Total Amount to Pay</span>
                                    <span>
                                        ₹{(totalPrice * rooms) - ((totalPrice * rooms) * discount) / 100}
                                    </span>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={handleBooking}
                            className="w-full py-4 rounded-2xl font-semibold bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 transition shadow-md cursor-pointer"
                        >
                            Confirm Reservation
                        </button>

                    </div>
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
                                    disabledDates={disabledDates}
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
