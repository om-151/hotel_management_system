import { useEffect, useState } from "react";
import { BedDouble, Users } from "lucide-react";
import API from "../api/axios";

const ClientBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cancellingId, setCancellingId] = useState(null);

    const token = localStorage.getItem("userToken");

    // Fetch User Bookings
    const fetchMyBookings = async () => {
        try {
            const res = await API.get(
                "http://localhost:5000/api/bookings/my-bookings",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setBookings(res.data.bookings || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyBookings();
    }, []);

    // Cancel Booking
    const handleCancel = async (id) => {
        try {
            setCancellingId(id);

            await API.put(
                `http://localhost:5000/api/bookings/${id}/cancel`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            // Instant UI Update
            setBookings((prev) =>
                prev.map((booking) =>
                    booking._id === id
                        ? { ...booking, booking_status: "cancelled" }
                        : booking
                )
            );
        } catch (error) {
            console.error(error);
        } finally {
            setCancellingId(null);
        }
    };

    const calculateDays = (checkIn, checkOut) => {
        const inDate = new Date(checkIn);
        const outDate = new Date(checkOut);
        return Math.ceil((outDate - inDate) / (1000 * 60 * 60 * 24));
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case "confirmed":
                return "bg-green-100 text-green-600";
            case "cancelled":
                return "bg-red-100 text-red-600";
            case "completed":
                return "bg-blue-100 text-blue-600";
            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    const formatDate = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="pt-24 pb-20 px-4 sm:px-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-3xl font-semibold text-amber-600">
                        My Trips
                    </h2>
                    <span className="text-sm text-gray-500">
                        {bookings.length} bookings
                    </span>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="space-y-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="animate-pulse bg-white rounded-2xl h-40" />
                        ))}
                    </div>
                ) : bookings.length === 0 ? (
                    /* Empty State */
                    <div className="text-center py-24 bg-white rounded-2xl shadow-sm">
                        <h3 className="text-xl font-semibold text-gray-800">
                            No trips booked yet
                        </h3>
                        <p className="text-gray-500 mt-2">
                            Once you book a stay, it will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {bookings.map((booking) => {
                            const totalDays = calculateDays(
                                booking.check_in_date,
                                booking.check_out_date
                            );

                            const pricePerNight = booking.roomId?.price || 0;
                            const totalPrice = totalDays * pricePerNight;

                            return (
                                <div
                                    key={booking._id}
                                    className="bg-white rounded-3xl shadow-sm hover:shadow-md transition duration-300 overflow-hidden border border-gray-100"
                                >
                                    <div className="flex flex-col md:flex-row">

                                        {/* Room Image */}
                                        <div className="w-full md:w-1/3">
                                            <div className="relative w-full aspect-[4/3] md:aspect-[3/2] overflow-hidden rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
                                                <img
                                                    src={
                                                        booking.roomId?.images?.[0]
                                                            ? `http://localhost:5000/${booking.roomId.images[0]}`
                                                            : "https://images.unsplash.com/photo-1501117716987-c8e3f3b15e47"
                                                    }
                                                    alt="room"
                                                    className="absolute inset-0 w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 p-6 flex flex-col justify-between">

                                            {/* Top Info */}
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="text-xl font-semibold text-gray-900">
                                                            {booking.roomId?.name}
                                                        </h3>
                                                        <p className="text-sm text-gray-500 capitalize">
                                                            {booking.roomId?.room_type}
                                                        </p>
                                                    </div>

                                                    {/* Status Badge */}
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                                                            booking.booking_status
                                                        )}`}
                                                    >
                                                        {booking.booking_status}
                                                    </span>
                                                </div>

                                                {/* Dates */}
                                                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                                    <div>
                                                        <p className="text-gray-400">Check-in</p>
                                                        <p className="font-medium">
                                                            {formatDate(booking.check_in_date)}
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <p className="text-gray-400">Check-out</p>
                                                        <p className="font-medium">
                                                            {formatDate(booking.check_out_date)}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mt-2">

                                                    {/* Nights */}
                                                    <span>
                                                        {totalDays} nights · ₹{pricePerNight} per night
                                                    </span>

                                                    <span className="text-gray-300">•</span>

                                                    {/* Rooms */}
                                                    <div className="flex items-center gap-1">
                                                        <BedDouble size={16} />
                                                        <span>{booking.numberOfRooms || 1} Rooms</span>
                                                    </div>

                                                    <span className="text-gray-300">•</span>

                                                    {/* Guests */}
                                                    <div className="flex items-center gap-1">
                                                        <Users size={16} />
                                                        <span>{booking.numberOfGuests || 1} Guests</span>
                                                    </div>

                                                </div>
                                            </div>

                                            {/* Bottom Section */}
                                            <div className="flex items-center justify-between mt-6 pt-4 border-t">

                                                {/* Total Price */}
                                                <div>
                                                    <p className="text-gray-400 text-sm">
                                                        Total Paid
                                                    </p>
                                                    <p className="text-lg font-semibold text-gray-900">
                                                        ₹{totalPrice}
                                                    </p>
                                                </div>

                                                {/* Cancel Button */}
                                                {booking.booking_status === "confirmed" && (
                                                    <button
                                                        onClick={() => handleCancel(booking._id)}
                                                        disabled={cancellingId === booking._id}
                                                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl text-sm transition disabled:opacity-50 cursor-pointer"
                                                    >
                                                        {cancellingId === booking._id
                                                            ? "Cancelling..."
                                                            : "Cancel"}
                                                    </button>
                                                )}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClientBooking;
