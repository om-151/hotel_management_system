import { useEffect, useState } from "react";
import API from "../../api/axios";
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline";
import RoomForm from "./RoomForm";

const ROOMS_API = "http://localhost:5000/api/rooms";
const IMAGE_BASE = "http://localhost:5000/";

const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingRoom, setEditingRoom] = useState(null);

    const token = localStorage.getItem("adminToken");

    const fetchRooms = async () => {
        try {
            const res = await API.get(ROOMS_API);
            const roomsData = res.data.rooms || [];
            setRooms(roomsData);
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
        if (!confirm("Delete this room?")) return;

        try {
            await API.delete(`${ROOMS_API}/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setRooms((prev) => prev.filter((r) => r._id !== id));
        } catch {
            alert("Delete failed");
        }
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-2xl font-semibold text-slate-900">
                    Rooms Management
                </h1>

                <button
                    onClick={() => {
                        setEditingRoom(null);
                        setShowForm(true);
                    }}
                    className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-md text-sm hover:bg-slate-800"
                >
                    <PlusIcon className="w-4 h-4" />
                    Add Room
                </button>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block bg-white border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-xs uppercase text-slate-600">
                        <tr>
                            <th className="px-4 py-3 text-left">Room</th>
                            <th className="px-4 py-3">Location</th>
                            <th className="px-4 py-3">Price</th>
                            <th className="px-4 py-3">Rating</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="py-6 text-center">
                                    Loading...
                                </td>
                            </tr>
                        ) : rooms.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="py-6 text-center">
                                    No rooms found
                                </td>
                            </tr>
                        ) : (
                            rooms.map((room) => (
                                <tr key={room._id} className="hover:bg-slate-50">
                                    <td className="px-4 py-3 flex gap-3 items-center">
                                        <img
                                            src={
                                                room.images?.[0]
                                                    ? IMAGE_BASE + room.images[0]
                                                    : "https://via.placeholder.com/60"
                                            }
                                            className="w-14 h-12 rounded object-cover"
                                        />
                                        <div>
                                            <div className="font-medium">{room.name}</div>
                                            <div className="text-xs text-slate-500 capitalize">
                                                {room.room_type}
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-4 py-3 text-center">
                                        {room.city}, {room.state}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        ₹{room.price}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        ⭐ {room.rating}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${room.availability
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {room.availability ? "Available" : "Booked"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right space-x-2">
                                        <button
                                            onClick={() => {
                                                setEditingRoom(room);
                                                setShowForm(true);
                                            }}
                                            className="border rounded p-2 hover:bg-slate-100"
                                        >
                                            <PencilIcon className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(room._id)}
                                            className="border rounded p-2 text-red-600 hover:bg-red-50"
                                        >
                                            <TrashIcon className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {rooms.map((room) => (
                    <div
                        key={room._id}
                        className="bg-white border rounded-lg p-4 space-y-2"
                    >
                        <img
                            src={
                                room.images?.[0]
                                    ? IMAGE_BASE + room.images[0]
                                    : "https://via.placeholder.com/300x150"
                            }
                            className="w-full h-40 object-cover rounded"
                        />
                        <div className="font-semibold">{room.name}</div>
                        <div className="text-sm text-slate-500 capitalize">
                            {room.room_type} • {room.city}
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>₹{room.price}</span>
                            <span>⭐ {room.rating}</span>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => {
                                    setEditingRoom(room);
                                    setShowForm(true);
                                }}
                                className="border p-2 rounded"
                            >
                                <PencilIcon className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => handleDelete(room._id)}
                                className="border p-2 rounded text-red-600"
                            >
                                <TrashIcon className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
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
