import { useEffect, useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import API from "../../api/axios";

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [updatingId, setUpdatingId] = useState(null);
    const [filterText, setFilterText] = useState("");

    const BOOKINGS_API = "http://localhost:5000/api/bookings";
    const token = localStorage.getItem("adminToken");

    // Fetch All Bookings
    const fetchBookings = async () => {
        try {
            setLoading(true);
            const res = await API.get(BOOKINGS_API, {
                headers: { Authorization: `Bearer ${token}` },
            });
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

    // ✅ Optimistic Status Update
    const handleComplete = async (id) => {
        try {
            setUpdatingId(id);

            // Call backend
            await API.put(
                `${BOOKINGS_API}/${id}/complete`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            // Update UI instantly
            setBookings((prev) =>
                prev.map((booking) =>
                    booking._id === id
                        ? { ...booking, booking_status: "completed" }
                        : booking
                )
            );
        } catch (error) {
            console.error(error);
        } finally {
            setUpdatingId(null);
        }
    };

    const calculateDays = (checkIn, checkOut) => {
        const inDate = new Date(checkIn);
        const outDate = new Date(checkOut);
        return Math.ceil((outDate - inDate) / (1000 * 60 * 60 * 24));
    };

    const getStatusBadge = (status) => {
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

    const columns = [
        {
            name: "User",
            selector: (row) => row.userId?.name,
            sortable: true,
            cell: (row) => (
                <div>
                    <p className="font-semibold">{row.userId?.name}</p>
                    <p className="text-xs text-gray-500">{row.userId?.email}</p>
                </div>
            ),
        },
        {
            name: "Room",
            selector: (row) => row.roomId?.roomNumber,
            sortable: true,
            cell: (row) => (
                <div>
                    <p>Room #{row.roomId?.roomNumber}</p>
                    <p className="text-xs text-gray-500">
                        {row.roomId?.type} | ₹{row.roomId?.price}
                    </p>
                </div>
            ),
        },
        {
            name: "Stay Dates",
            cell: (row) => (
                <div className="text-xs">
                    <p>
                        {new Date(row.check_in_date).toLocaleDateString()}
                    </p>
                    <p>
                        to {new Date(row.check_out_date).toLocaleDateString()}
                    </p>
                </div>
            ),
        },
        {
            name: "Days",
            sortable: true,
            cell: (row) => (
                <span className="font-semibold">
                    {calculateDays(
                        row.check_in_date,
                        row.check_out_date
                    )} Days
                </span>
            ),
        },
        {
            name: "Status",
            sortable: true,
            cell: (row) => (
                <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                        row.booking_status
                    )}`}
                >
                    {row.booking_status}
                </span>
            ),
        },
        {
            name: "Booked On",
            sortable: true,
            cell: (row) =>
                new Date(row.createdAt).toLocaleDateString(),
        },
        {
            name: "Action",
            center: true,
            cell: (row) =>
                row.booking_status === "confirmed" ? (
                    <button
                        onClick={() => handleComplete(row._id)}
                        disabled={updatingId === row._id}
                        className="bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white px-3 py-1 rounded-lg text-xs transition"
                    >
                        {updatingId === row._id
                            ? "Updating..."
                            : "Mark Completed"}
                    </button>
                ) : (
                    <span className="text-gray-400 text-xs">
                        No Action
                    </span>
                ),
        },
    ];

    const filteredData = useMemo(() => {
        return bookings.filter((item) =>
            item.userId?.name
                ?.toLowerCase()
                .includes(filterText.toLowerCase())
        );
    }, [bookings, filterText]);

    const customStyles = {
        rows: {
            style: {
                minHeight: "70px",
            },
        },
        headCells: {
            style: {
                fontSize: "14px",
                fontWeight: "600",
                backgroundColor: "#f9fafb",
            },
        },
        cells: {
            style: {
                fontSize: "13px",
            },
        },
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="bg-white p-6 rounded-2xl shadow-md">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Manage Bookings
                    </h1>

                    <input
                        type="text"
                        placeholder="Search by user name..."
                        className="border px-4 py-2 rounded-lg text-sm w-full md:w-64 focus:ring-2 focus:ring-indigo-400 outline-none"
                        value={filterText}
                        onChange={(e) =>
                            setFilterText(e.target.value)
                        }
                    />
                </div>

                <DataTable
                    columns={columns}
                    data={filteredData}
                    progressPending={loading}
                    pagination
                    highlightOnHover
                    responsive
                    striped
                    customStyles={customStyles}
                    noDataComponent="No bookings available."
                />
            </div>
        </div>
    );
};

export default Bookings;
