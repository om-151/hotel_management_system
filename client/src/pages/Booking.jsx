import { useEffect, useState } from "react";
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

    return (
        <div className="pt-28 pb-16 px-6 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">
                    My Bookings
                </h2>

                {loading ? (
                    <p className="text-center text-gray-500">
                        Loading bookings...
                    </p>
                ) : bookings.length === 0 ? (
                    <div className="text-center text-gray-500">
                        No bookings found.
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                        {bookings.map((booking) => (
                            <div
                                key={booking._id}
                                className="bg-white rounded-2xl shadow-md p-6 space-y-4"
                            >
                                {/* Room Info */}
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        Room #{booking.roomId?.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 capitalize">
                                        {booking.roomId?.room_type}
                                    </p>
                                </div>

                                {/* Dates */}
                                <div className="text-sm text-gray-600 space-y-1">
                                    <p>
                                        <strong>Check-in:</strong>{" "}
                                        {new Date(
                                            booking.check_in_date
                                        ).toLocaleDateString()}
                                    </p>
                                    <p>
                                        <strong>Check-out:</strong>{" "}
                                        {new Date(
                                            booking.check_out_date
                                        ).toLocaleDateString()}
                                    </p>
                                    <p>
                                        <strong>Stay:</strong>{" "}
                                        {calculateDays(
                                            booking.check_in_date,
                                            booking.check_out_date
                                        )}{" "}
                                        Days
                                    </p>
                                </div>

                                {/* Status */}
                                <div>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                                            booking.booking_status
                                        )}`}
                                    >
                                        {booking.booking_status}
                                    </span>
                                </div>

                                {/* Action */}
                                {booking.booking_status === "confirmed" && (
                                    <button
                                        onClick={() =>
                                            handleCancel(booking._id)
                                        }
                                        disabled={
                                            cancellingId === booking._id
                                        }
                                        className="w-full bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white py-2 rounded-lg text-sm transition cursor-pointer"
                                    >
                                        {cancellingId === booking._id
                                            ? "Cancelling..."
                                            : "Cancel Booking"}
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClientBooking;
