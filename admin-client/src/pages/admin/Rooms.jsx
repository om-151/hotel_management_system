import { useEffect, useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import { Star } from "lucide-react";
import API from "../../api/axios";
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline";
import RoomForm from "./RoomForm";
import Swal from "sweetalert2";

const ROOMS_API = "http://localhost:5000/api/rooms";
const IMAGE_BASE = "http://localhost:5000/";

const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingRoom, setEditingRoom] = useState(null);
    const [filterText, setFilterText] = useState("");

    const token = localStorage.getItem("adminToken");

    const fetchRooms = async () => {
        try {
            const res = await API.get(ROOMS_API);
            setRooms(res.data.rooms || []);
        } catch (err) {
            console.error(err);
            setRooms([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Delete Room?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, Delete",
        });

        if (!result.isConfirmed) return;

        try {
            await API.delete(`${ROOMS_API}/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setRooms((prev) => prev.filter((r) => r._id !== id));

            Swal.fire({
                title: "Deleted!",
                text: "Room has been deleted successfully.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
            });

        } catch {
            Swal.fire({
                title: "Error!",
                text: "Delete failed.",
                icon: "error",
            });
        }
    };

    // Filter
    const filteredRooms = useMemo(() => {
        return rooms.filter((room) =>
            room.name?.toLowerCase().includes(filterText.toLowerCase())
        );
    }, [rooms, filterText]);

    // Columns
    const columns = [
        {
            name: "Room",
            sortable: true,
            cell: (row) => (
                <div className="flex items-center gap-3">
                    <img
                        src={
                            row.images?.[0]
                                ? IMAGE_BASE + row.images[0]
                                : "https://via.placeholder.com/60"
                        }
                        className="w-14 h-12 rounded-lg object-cover"
                        alt="room"
                    />
                    <div>
                        <div className="font-semibold">{row.name}</div>
                        <div className="text-xs text-gray-500 capitalize">
                            {row.room_type}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            name: "Location",
            sortable: true,
            selector: (row) => `${row.city}, ${row.state}`,
        },
        {
            name: "Price",
            sortable: true,
            selector: (row) => `₹${row.price}`,
        },
        {
            name: "Rating",
            sortable: true,
            selector: (row) => row.rating,
            center: true,
            cell: (row) => (
                <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-medium">{row.rating}</span>
                </div>
            ),
        },
        {
            name: "Status",
            sortable: true,
            cell: (row) => (
                <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${row.availability
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                        }`}
                >
                    {row.availability ? "Available" : "Booked"}
                </span>
            ),
        },
        {
            name: "Actions",
            center: true,
            cell: (row) => (
                <div className="flex gap-2">
                    <button
                        onClick={() => {
                            setEditingRoom(row);
                            setShowForm(true);
                        }}
                        className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 hover:scale-105 transition-all duration-200 cursor-pointer"
                        title="Edit Room"
                    >
                        <PencilIcon className="w-4 h-4" />
                    </button>

                    <button
                        onClick={() => handleDelete(row._id)}
                        className="flex items-center justify-center w-9 h-9 rounded-full bg-red-100 text-red-600 hover:bg-red-200 hover:scale-105 transition-all duration-200 cursor-pointer"
                        title="Delete Room"
                    >
                        <TrashIcon className="w-4 h-4" />
                    </button>
                </div>
            ),
        },
    ];

    const customStyles = {
        rows: {
            style: {
                minHeight: "60px",
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
        <div className="p-6 min-h-screen">
            <div className="bg-white p-6 rounded-2xl shadow-md">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Manage Rooms
                    </h1>

                    <div className="flex gap-3 w-full md:w-auto">
                        <input
                            type="text"
                            placeholder="Search rooms..."
                            className="border px-4 py-2 border-gray-300 rounded-lg text-sm w-full md:w-64 focus:ring-2 focus:ring-blue-500 outline-none"
                            value={filterText}
                            onChange={(e) =>
                                setFilterText(e.target.value)
                            }
                        />

                        <button
                            onClick={() => {
                                setEditingRoom(null);
                                setShowForm(true);
                            }}
                            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm transition cursor-pointer"
                        >
                            <PlusIcon className="w-4 h-4" />
                            Add Room
                        </button>
                    </div>
                </div>

                {/* DataTable */}
                <DataTable
                    columns={columns}
                    data={filteredRooms}
                    progressPending={loading}
                    pagination
                    highlightOnHover
                    responsive
                    striped
                    customStyles={customStyles}
                    noDataComponent="No rooms found."
                />
            </div>

            {showForm && (
                <RoomForm
                    editingRoom={editingRoom}
                    onClose={() => setShowForm(false)}
                    onSuccess={fetchRooms}
                />
            )}
        </div>
    );
};

export default Rooms;
