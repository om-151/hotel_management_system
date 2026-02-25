import { useEffect, useState } from "react";
import API from "../../api/axios";
import {
    FaUsers,
    FaHotel,
    FaCheckCircle,
    FaTimesCircle,
} from "react-icons/fa";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";

const BASE_URL = "http://localhost:5000/api";

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("adminToken");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userRes, roomRes, bookingRes] = await Promise.all([
                    API.get(`${BASE_URL}/users`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    API.get(`${BASE_URL}/rooms`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    API.get(`${BASE_URL}/bookings`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);

                setUsers(userRes.data.users || []);
                setRooms(roomRes.data.rooms || []);
                setBookings(bookingRes.data.bookings || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // 🔥 Dynamic Calculations
    const totalUsers = users.length;
    const totalRooms = rooms.length;
    const availableRooms = rooms.filter(
        (room) => room.availability === true
    ).length;

    const totalBookings = bookings.length;
    const confirmedBookings = bookings.filter(
        (b) => b.booking_status === "confirmed"
    ).length;
    const cancelledBookings = bookings.filter(
        (b) => b.booking_status === "cancelled"
    ).length;

    // 📊 Chart Data
    const bookingChartData = [
        { name: "Confirmed", value: confirmedBookings },
        { name: "Cancelled", value: cancelledBookings },
    ];

    const roomChartData = [
        { name: "Total Rooms", value: totalRooms },
        { name: "Available", value: availableRooms },
    ];

    if (loading) {
        return (
            <div className="pt-28 text-center text-lg font-semibold">
                Loading Dashboard...
            </div>
        );
    }

    return (
        <div
            className="min-h-screen px-8 py-8"
        >
            {/* ================= STAT CARDS ================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">

                {[
                    { label: "Total Users", value: totalUsers, icon: <FaUsers /> },
                    { label: "Total Rooms", value: totalRooms, icon: <FaHotel /> },
                    { label: "Available Rooms", value: availableRooms, icon: <FaCheckCircle /> },
                    { label: "Total Bookings", value: totalBookings, icon: <FaHotel /> },
                    { label: "Confirmed", value: confirmedBookings, icon: <FaCheckCircle /> },
                    { label: "Cancelled", value: cancelledBookings, icon: <FaTimesCircle /> },
                ].map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition duration-300 border-t-4"
                        style={{ borderColor: "#4B9DA9" }}
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-gray-600 text-sm">
                                    {item.label}
                                </p>
                                <h2
                                    className="text-3xl font-semibold mt-2"
                                    style={{ color: "#E37434" }}
                                >
                                    {item.value}
                                </h2>
                            </div>

                            <div
                                className="p-3 rounded-full text-white text-xl"
                                style={{ backgroundColor: "#4B9DA9" }}
                            >
                                {item.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ================= CHARTS ================= */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                {/* Booking Pie Chart */}
                <div className="bg-white rounded-xl p-6 shadow-md">
                    <h2
                        className="text-lg font-semibold mb-6"
                        style={{ color: "#4B9DA9" }}
                    >
                        Booking Overview
                    </h2>

                    <ResponsiveContainer width="100%" height={280}>
                        <PieChart>
                            <Pie
                                data={bookingChartData}
                                dataKey="value"
                                outerRadius={100}
                            >
                                <Cell fill="#4B9DA9" />
                                <Cell fill="#E37434" />
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Room Bar Chart */}
                <div className="bg-white rounded-xl p-6 shadow-md">
                    <h2
                        className="text-lg font-semibold mb-6"
                        style={{ color: "#4B9DA9" }}
                    >
                        Room Statistics
                    </h2>

                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={roomChartData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar
                                dataKey="value"
                                fill="#91C6BC"
                                radius={[6, 6, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;