import { useEffect, useState } from "react";
import API from "../../api/axios";

const ROOMS_API = "http://localhost:5000/api/rooms";
const IMAGE_BASE = "http://localhost:5000/";

const RoomForm = ({ editingRoom, onClose, onSuccess }) => {
    const token = localStorage.getItem("adminToken");

    const [form, setForm] = useState({
        name: "",
        price: "",
        base_price: "",
        rating: "",
        availability: true,
        city: "",
        state: "",
        room_type: "",
        room_desc: "",
    });

    // 🔥 PROPER IMAGE STATES
    const [existingImages, setExistingImages] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const [removedImages, setRemovedImages] = useState([]);

    useEffect(() => {
        if (editingRoom) {
            setForm({
                name: editingRoom.name,
                price: editingRoom.price,
                base_price: editingRoom.base_price,
                rating: editingRoom.rating,
                availability: editingRoom.availability,
                city: editingRoom.city,
                state: editingRoom.state,
                room_type: editingRoom.room_type,
                room_desc: editingRoom.room_desc || "",
            });
            setExistingImages(editingRoom.images || []);
        }
    }, [editingRoom]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    const handleNewImages = (e) => {
        setNewImages([...newImages, ...Array.from(e.target.files)]);
    };

    const removeExistingImage = (img) => {
        setExistingImages(existingImages.filter((i) => i !== img));
        setRemovedImages([...removedImages, img]);
    };

    const removeNewImage = (index) => {
        const copy = [...newImages];
        copy.splice(index, 1);
        setNewImages(copy);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        Object.entries(form).forEach(([key, value]) => {
            formData.append(key, value);
        });

        newImages.forEach((img) => {
            formData.append("images", img);
        });

        formData.append("removedImages", JSON.stringify(removedImages));

        try {
            if (editingRoom) {
                await API.put(`${ROOMS_API}/${editingRoom._id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                });
            } else {
                await API.post(ROOMS_API, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                });
            }

            onSuccess();
            onClose();
        } catch (err) {
            console.error(err);
            alert("Failed to save room");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-2xl rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-6">
                    {editingRoom ? "Edit Room" : "Create Room"}
                </h2>

                <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
                    <input className="border px-3 py-2 rounded" name="name" value={form.name} onChange={handleChange} placeholder="Room name" />
                    <input className="border px-3 py-2 rounded" name="room_type" value={form.room_type} onChange={handleChange} placeholder="Room type" />
                    <input className="border px-3 py-2 rounded" name="city" value={form.city} onChange={handleChange} placeholder="City" />
                    <input className="border px-3 py-2 rounded" name="state" value={form.state} onChange={handleChange} placeholder="State" />
                    <input className="border px-3 py-2 rounded" type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" />
                    <input className="border px-3 py-2 rounded" type="number" name="base_price" value={form.base_price} onChange={handleChange} placeholder="Base price" />
                    <input className="border px-3 py-2 rounded" type="number" name="rating" value={form.rating} onChange={handleChange} placeholder="Rating" />

                    <textarea className="border px-3 py-2 rounded sm:col-span-2" rows="3" name="room_desc" value={form.room_desc} onChange={handleChange} placeholder="Room description" />

                    {/* 🔥 EXISTING IMAGES */}
                    {existingImages.length > 0 && (
                        <div className="sm:col-span-2">
                            <p className="text-sm mb-2 font-medium">Existing Images</p>
                            <div className="flex flex-wrap gap-3">
                                {existingImages.map((img) => (
                                    <div key={img} className="relative">
                                        <img src={IMAGE_BASE + img} className="w-24 h-20 object-cover rounded border" />
                                        <button
                                            type="button"
                                            onClick={() => removeExistingImage(img)}
                                            className="absolute -top-2 -right-2 bg-red-600 text-white w-5 h-5 text-xs rounded-full"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 🔥 NEW IMAGES */}
                    <div className="sm:col-span-2">
                        <input type="file" multiple accept="image/*" onChange={handleNewImages} />
                        {newImages.length > 0 && (
                            <div className="flex flex-wrap gap-3 mt-3">
                                {newImages.map((img, i) => (
                                    <div key={i} className="relative">
                                        <img src={URL.createObjectURL(img)} className="w-24 h-20 object-cover rounded border" />
                                        <button
                                            type="button"
                                            onClick={() => removeNewImage(i)}
                                            className="absolute -top-2 -right-2 bg-slate-900 text-white w-5 h-5 text-xs rounded-full"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <label className="sm:col-span-2 flex gap-2 items-center">
                        <input type="checkbox" name="availability" checked={form.availability} onChange={handleChange} />
                        Available
                    </label>

                    <div className="sm:col-span-2 flex justify-end gap-2">
                        <button type="button" onClick={onClose} className="border px-4 py-2 rounded">
                            Cancel
                        </button>
                        <button className="bg-slate-900 text-white px-5 py-2 rounded">
                            Save Room
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RoomForm;
