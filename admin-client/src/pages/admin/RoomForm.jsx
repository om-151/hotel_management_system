import { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import API from "../../api/axios";

const ROOMS_API = "http://localhost:5000/api/rooms";
const IMAGE_BASE = "http://localhost:5000/";

const roomTypes = ["single", "double", "deluxe", "suite"];
const ratingOptions = Array.from({ length: 9 }, (_, i) =>
    (1 + i * 0.5).toFixed(1)
);

const RoomForm = ({ editingRoom, onClose, onSuccess }) => {
    const token = localStorage.getItem("adminToken");
    const fileInputRef = useRef();

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

    const [errors, setErrors] = useState({});
    const [existingImages, setExistingImages] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const [removedImages, setRemovedImages] = useState([]);
    const [dragActive, setDragActive] = useState(false);

    useEffect(() => {
        if (editingRoom) {
            setForm({
                name: editingRoom.name || "",
                price: editingRoom.price || "",
                base_price: editingRoom.base_price || "",
                rating: editingRoom.rating || "",
                availability: editingRoom.availability,
                city: editingRoom.city || "",
                state: editingRoom.state || "",
                room_type: editingRoom.room_type || "",
                room_desc: editingRoom.room_desc || "",
            });
            setExistingImages(editingRoom.images || []);
        }
    }, [editingRoom]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
        setErrors({ ...errors, [name]: "" });
    };

    // ================= VALIDATION =================
    const validate = () => {
        let newErrors = {};

        Object.entries(form).forEach(([key, value]) => {
            if (
                key !== "availability" &&
                (value === "" || value === null)
            ) {
                newErrors[key] = "This field is required";
            }
        });

        if (form.price <= 0) newErrors.price = "Price must be greater than 0";
        if (form.base_price <= 0)
            newErrors.base_price = "Base price must be greater than 0";

        if (newImages.length === 0 && existingImages.length === 0)
            newErrors.images = "At least one image is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // ================= IMAGE HANDLING =================
    const handleFiles = (files) => {
        const fileArray = Array.from(files).filter((file) =>
            file.type.startsWith("image/")
        );
        setNewImages((prev) => [...prev, ...fileArray]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);
        handleFiles(e.dataTransfer.files);
    };

    const removeExistingImage = (img) => {
        setExistingImages(existingImages.filter((i) => i !== img));
        setRemovedImages([...removedImages, img]);
    };

    const removeNewImage = (index) => {
        const updated = [...newImages];
        updated.splice(index, 1);
        setNewImages(updated);
    };

    // ================= SUBMIT =================
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

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
                    },
                });

                await Swal.fire({
                    icon: "success",
                    title: "Room Updated Successfully!",
                    text: "The room details have been updated.",
                    showConfirmButton: false,
                    timer: 1500,
                });

            } else {
                await API.post(ROOMS_API, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                await Swal.fire({
                    icon: "success",
                    title: "Room Created Successfully!",
                    text: "New room has been added.",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }

            onSuccess();
            onClose();

        } catch (err) {
            console.error(err);

            Swal.fire({
                icon: "error",
                title: "Something went wrong!",
                text: "Failed to save room.",
                showConfirmButton: false,
                timer: 2500,
            });
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
            <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden max-h-[90vh] overflow-y-auto custom-scroll">

                {/* Header */}
                <div className="sticky top-0 bg-white/90 backdrop-blur-md z-10 px-8 py-5 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">
                            {editingRoom ? "Edit Room" : "Create Room"}
                        </h2>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-9 h-9 flex items-center justify-center rounded-full text-black font-bold transition cursor-pointer"
                    >
                        ✕
                    </button>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="p-8 grid md:grid-cols-2 gap-6"
                >

                    {/* Name */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-600">
                            Room Name
                        </label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Luxury Suite"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-slate-900 focus:outline-none transition"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-xs">{errors.name}</p>
                        )}
                    </div>

                    {/* Room Type */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-600">
                            Room Type
                        </label>
                        <select
                            name="room_type"
                            value={form.room_type}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-slate-900 focus:outline-none transition cursor-pointer"
                        >
                            <option value="">Select Type</option>
                            {roomTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                        {errors.room_type && (
                            <p className="text-red-500 text-xs">{errors.room_type}</p>
                        )}
                    </div>

                    {/* City */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-600">
                            City
                        </label>
                        <input
                            name="city"
                            value={form.city}
                            onChange={handleChange}
                            placeholder="Mumbai"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-slate-900 focus:outline-none transition"
                        />
                        {errors.city && (
                            <p className="text-red-500 text-xs">{errors.city}</p>
                        )}
                    </div>

                    {/* State */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-600">
                            State
                        </label>
                        <input
                            name="state"
                            value={form.state}
                            onChange={handleChange}
                            placeholder="Gujarat"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-slate-900 focus:outline-none transition"
                        />
                        {errors.state && (
                            <p className="text-red-500 text-xs">{errors.state}</p>
                        )}
                    </div>

                    {/* Price */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-600">
                            Price Per Night
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            placeholder="2500"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-slate-900 focus:outline-none transition"
                        />
                        {errors.price && (
                            <p className="text-red-500 text-xs">{errors.price}</p>
                        )}
                    </div>

                    {/* Base Price */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-600">
                            Base Price
                        </label>
                        <input
                            type="number"
                            name="base_price"
                            value={form.base_price}
                            onChange={handleChange}
                            placeholder="2000"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-slate-900 focus:outline-none transition"
                        />
                        {errors.base_price && (
                            <p className="text-red-500 text-xs">{errors.base_price}</p>
                        )}
                    </div>

                    {/* Rating */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-600">
                            Rating
                        </label>
                        <select
                            name="rating"
                            value={form.rating}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-slate-900 focus:outline-none transition cursor-pointer"
                        >
                            <option value="">Select Rating</option>
                            {ratingOptions.map((rate) => (
                                <option key={rate} value={rate}>
                                    ⭐ {rate}
                                </option>
                            ))}
                        </select>
                        {errors.rating && (
                            <p className="text-red-500 text-xs">{errors.rating}</p>
                        )}
                    </div>

                    {/* Availability Toggle */}
                    <div className="flex items-center gap-3 mt-7">
                        <input
                            type="checkbox"
                            name="availability"
                            checked={form.availability}
                            onChange={handleChange}
                            className="w-5 h-5 accent-slate-900 cursor-pointer"
                        />
                        <span className="text-sm font-medium text-gray-700">
                            Available for booking
                        </span>
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-sm font-semibold text-gray-600">
                            Room Description
                        </label>
                        <textarea
                            rows="4"
                            name="room_desc"
                            value={form.room_desc}
                            onChange={handleChange}
                            placeholder="Write a detailed description of the room..."
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-slate-900 focus:outline-none transition resize-none"
                        />
                        {errors.room_desc && (
                            <p className="text-red-500 text-xs">{errors.room_desc}</p>
                        )}
                    </div>

                    {/* Upload Area */}
                    <div className="md:col-span-2">
                        <div
                            onDragOver={(e) => {
                                e.preventDefault();
                                setDragActive(true);
                            }}
                            onDragLeave={() => setDragActive(false)}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current.click()}
                            className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition ${dragActive
                                ? "border-slate-900 bg-slate-50"
                                : "border-gray-300 hover:border-slate-600"
                                }`}
                        >
                            <p className="text-gray-600 font-medium">
                                Drag & Drop images here
                            </p>
                            <p className="text-sm text-gray-400 mt-1">
                                or click to browse files
                            </p>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={(e) => handleFiles(e.target.files)}
                                className="hidden"
                            />
                        </div>
                        {errors.images && (
                            <p className="text-red-500 text-xs mt-2">{errors.images}</p>
                        )}
                    </div>

                    {/* Image Preview */}
                    <div className="md:col-span-2 flex flex-wrap gap-5">
                        {[...existingImages, ...newImages].map((img, i) => (
                            <div
                                key={i}
                                className="relative group w-32 h-28 rounded-xl overflow-hidden shadow-md"
                            >
                                <img
                                    src={
                                        typeof img === "string"
                                            ? IMAGE_BASE + img
                                            : URL.createObjectURL(img)
                                    }
                                    className="w-full h-full object-cover group-hover:scale-105 transition"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        typeof img === "string"
                                            ? removeExistingImage(img)
                                            : removeNewImage(i - existingImages.length)
                                    }
                                    className="absolute top-2 right-2 bg-black/70 text-white w-7 h-7 rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Buttons */}
                    <div className="md:col-span-2 flex justify-end gap-4 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-3 py-2 rounded-xl border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white transition cursor-pointer font-semibold"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 rounded-xl bg-amber-600 text-white font-semibold shadow-md hover:bg-amber-700 transition cursor-pointer"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RoomForm;
