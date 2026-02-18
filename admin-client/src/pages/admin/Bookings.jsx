import { useEffect, useState } from "react";
import API from "../../api/axios";

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch All Bookings (Admin)
    const fetchBookings = async () => {
        try {
            setLoading(true);
            const res = await API.get("/bookings");
            setBookings(res.data.bookings);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    // Mark as Completed (Admin)
    const handleComplete = async (id) => {
        try {
            await API.put(`/bookings/${id}/complete`);
            fetchBookings();
        } catch (error) {
            console.error(error);
        }
    };

    // Calculate total days
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
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Manage Bookings</h1>

            {loading ? (
                <p className="text-gray-500">Loading bookings...</p>
            ) : (
                <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Room</th>
                                <th className="px-6 py-4">Stay Dates</th>
                                <th className="px-6 py-4">Days</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Booked On</th>
                                <th className="px-6 py-4 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings?.map((booking) => (
                                <tr
                                    key={booking._id}
                                    className="border-b hover:bg-gray-50 transition"
                                >
                                    {/* User */}
                                    <td className="px-6 py-4">
                                        <div className="font-semibold">
                                            {booking.userId?.name}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {booking.userId?.email}
                                        </div>
                                    </td>

                                    {/* Room */}
                                    <td className="px-6 py-4">
                                        <div>
                                            Room #{booking.roomId?.roomNumber}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {booking.roomId?.type} | ₹
                                            {booking.roomId?.price}
                                        </div>
                                    </td>

                                    {/* Stay */}
                                    <td className="px-6 py-4 text-xs">
                                        <div>
                                            {new Date(
                                                booking.check_in_date
                                            ).toLocaleDateString()}
                                        </div>
                                        <div>
                                            to{" "}
                                            {new Date(
                                                booking.check_out_date
                                            ).toLocaleDateString()}
                                        </div>
                                    </td>

                                    {/* Days */}
                                    <td className="px-6 py-4 font-semibold">
                                        {calculateDays(
                                            booking.check_in_date,
                                            booking.check_out_date
                                        )}{" "}
                                        Days
                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                                                booking.booking_status
                                            )}`}
                                        >
                                            {booking.booking_status}
                                        </span>
                                    </td>

                                    {/* Created Date */}
                                    <td className="px-6 py-4 text-xs text-gray-500">
                                        {new Date(
                                            booking.createdAt
                                        ).toLocaleDateString()}
                                    </td>

                                    {/* Action */}
                                    <td className="px-6 py-4 text-center">
                                        {booking.booking_status ===
                                            "confirmed" ? (
                                            <button
                                                onClick={() =>
                                                    handleComplete(
                                                        booking._id
                                                    )
                                                }
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg text-xs transition"
                                            >
                                                Mark Completed
                                            </button>
                                        ) : (
                                            <span className="text-gray-400 text-xs">
                                                No Action
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}

                            {bookings?.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="text-center py-6 text-gray-500"
                                    >
                                        No bookings available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Bookings;
