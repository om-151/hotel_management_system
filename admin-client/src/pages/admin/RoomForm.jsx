// import { useEffect, useState } from "react";
// import API from "../../api/axios";

// const ROOMS_API = "http://localhost:5000/api/rooms";
// const IMAGE_BASE = "http://localhost:5000/";

// const RoomForm = ({ editingRoom, onClose, onSuccess }) => {
//     const token = localStorage.getItem("adminToken");

//     const [form, setForm] = useState({
//         name: "",
//         price: "",
//         base_price: "",
//         rating: "",
//         availability: true,
//         city: "",
//         state: "",
//         room_type: "",
//         room_desc: "",
//     });

//     // 🔥 PROPER IMAGE STATES
//     const [existingImages, setExistingImages] = useState([]);
//     const [newImages, setNewImages] = useState([]);
//     const [removedImages, setRemovedImages] = useState([]);

//     useEffect(() => {
//         if (editingRoom) {
//             setForm({
//                 name: editingRoom.name,
//                 price: editingRoom.price,
//                 base_price: editingRoom.base_price,
//                 rating: editingRoom.rating,
//                 availability: editingRoom.availability,
//                 city: editingRoom.city,
//                 state: editingRoom.state,
//                 room_type: editingRoom.room_type,
//                 room_desc: editingRoom.room_desc || "",
//             });
//             setExistingImages(editingRoom.images || []);
//         }
//     }, [editingRoom]);

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setForm({ ...form, [name]: type === "checkbox" ? checked : value });
//     };

//     const handleNewImages = (e) => {
//         setNewImages([...newImages, ...Array.from(e.target.files)]);
//     };

//     const removeExistingImage = (img) => {
//         setExistingImages(existingImages.filter((i) => i !== img));
//         setRemovedImages([...removedImages, img]);
//     };

//     const removeNewImage = (index) => {
//         const copy = [...newImages];
//         copy.splice(index, 1);
//         setNewImages(copy);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const formData = new FormData();

//         Object.entries(form).forEach(([key, value]) => {
//             formData.append(key, value);
//         });

//         newImages.forEach((img) => {
//             formData.append("images", img);
//         });

//         formData.append("removedImages", JSON.stringify(removedImages));

//         try {
//             if (editingRoom) {
//                 await API.put(`${ROOMS_API}/${editingRoom._id}`, formData, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                         "Content-Type": "multipart/form-data",
//                     },
//                 });
//             } else {
//                 await API.post(ROOMS_API, formData, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                         "Content-Type": "multipart/form-data",
//                     },
//                 });
//             }

//             onSuccess();
//             onClose();
//         } catch (err) {
//             console.error(err);
//             alert("Failed to save room");
//         }
//     };

//     return (
//         <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
//             <div className="bg-white w-full max-w-2xl rounded-lg p-6">
//                 <h2 className="text-xl font-semibold mb-6">
//                     {editingRoom ? "Edit Room" : "Create Room"}
//                 </h2>

//                 <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
//                     <input className="border px-3 py-2 rounded" name="name" value={form.name} onChange={handleChange} placeholder="Room name" />
//                     <input className="border px-3 py-2 rounded" name="room_type" value={form.room_type} onChange={handleChange} placeholder="Room type" />
//                     <input className="border px-3 py-2 rounded" name="city" value={form.city} onChange={handleChange} placeholder="City" />
//                     <input className="border px-3 py-2 rounded" name="state" value={form.state} onChange={handleChange} placeholder="State" />
//                     <input className="border px-3 py-2 rounded" type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" />
//                     <input className="border px-3 py-2 rounded" type="number" name="base_price" value={form.base_price} onChange={handleChange} placeholder="Base price" />
//                     <input className="border px-3 py-2 rounded" type="number" name="rating" value={form.rating} onChange={handleChange} placeholder="Rating" />

//                     <textarea className="border px-3 py-2 rounded sm:col-span-2" rows="3" name="room_desc" value={form.room_desc} onChange={handleChange} placeholder="Room description" />

//                     {/* 🔥 EXISTING IMAGES */}
//                     {existingImages.length > 0 && (
//                         <div className="sm:col-span-2">
//                             <p className="text-sm mb-2 font-medium">Existing Images</p>
//                             <div className="flex flex-wrap gap-3">
//                                 {existingImages.map((img) => (
//                                     <div key={img} className="relative">
//                                         <img src={IMAGE_BASE + img} className="w-24 h-20 object-cover rounded border" />
//                                         <button
//                                             type="button"
//                                             onClick={() => removeExistingImage(img)}
//                                             className="absolute -top-2 -right-2 bg-red-600 text-white w-5 h-5 text-xs rounded-full"
//                                         >
//                                             ✕
//                                         </button>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     )}

//                     {/* 🔥 NEW IMAGES */}
//                     <div className="sm:col-span-2">
//                         <input type="file" multiple accept="image/*" onChange={handleNewImages} />
//                         {newImages.length > 0 && (
//                             <div className="flex flex-wrap gap-3 mt-3">
//                                 {newImages.map((img, i) => (
//                                     <div key={i} className="relative">
//                                         <img src={URL.createObjectURL(img)} className="w-24 h-20 object-cover rounded border" />
//                                         <button
//                                             type="button"
//                                             onClick={() => removeNewImage(i)}
//                                             className="absolute -top-2 -right-2 bg-slate-900 text-white w-5 h-5 text-xs rounded-full"
//                                         >
//                                             ✕
//                                         </button>
//                                     </div>
//                                 ))}
//                             </div>
//                         )}
//                     </div>

//                     <label className="sm:col-span-2 flex gap-2 items-center">
//                         <input type="checkbox" name="availability" checked={form.availability} onChange={handleChange} />
//                         Available
//                     </label>

//                     <div className="sm:col-span-2 flex justify-end gap-2">
//                         <button type="button" onClick={onClose} className="border px-4 py-2 rounded">
//                             Cancel
//                         </button>
//                         <button className="bg-slate-900 text-white px-5 py-2 rounded">
//                             Save Room
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default RoomForm;

import { useEffect, useState, useRef } from "react";
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
            } else {
                await API.post(ROOMS_API, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
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
            <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-6 overflow-y-auto max-h-[90vh]">
                <h2 className="text-2xl font-semibold mb-6">
                    {editingRoom ? "Edit Room" : "Create Room"}
                </h2>

                <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">

                    {/* Name */}
                    <div>
                        <input
                            className="border px-3 py-2 rounded w-full"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Room name"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    {/* Room Type Dropdown */}
                    <div>
                        <select
                            name="room_type"
                            value={form.room_type}
                            onChange={handleChange}
                            className="border px-3 py-2 rounded w-full"
                        >
                            <option value="">Select Room Type</option>
                            {roomTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                        {errors.room_type && <p className="text-red-500 text-sm">{errors.room_type}</p>}
                    </div>

                    {/* City */}
                    <div>
                        <input
                            className="border px-3 py-2 rounded w-full"
                            name="city"
                            value={form.city}
                            onChange={handleChange}
                            placeholder="City"
                        />
                        {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                    </div>

                    {/* State */}
                    <div>
                        <input
                            className="border px-3 py-2 rounded w-full"
                            name="state"
                            value={form.state}
                            onChange={handleChange}
                            placeholder="State"
                        />
                        {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
                    </div>

                    {/* Price */}
                    <div>
                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            placeholder="Price"
                            className="border px-3 py-2 rounded w-full"
                        />
                        {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
                    </div>

                    {/* Base Price */}
                    <div>
                        <input
                            type="number"
                            name="base_price"
                            value={form.base_price}
                            onChange={handleChange}
                            placeholder="Base Price"
                            className="border px-3 py-2 rounded w-full"
                        />
                        {errors.base_price && <p className="text-red-500 text-sm">{errors.base_price}</p>}
                    </div>

                    {/* Rating Dropdown */}
                    <div>
                        <select
                            name="rating"
                            value={form.rating}
                            onChange={handleChange}
                            className="border px-3 py-2 rounded w-full"
                        >
                            <option value="">Select Rating</option>
                            {ratingOptions.map((rate) => (
                                <option key={rate} value={rate}>
                                    {rate}
                                </option>
                            ))}
                        </select>
                        {errors.rating && <p className="text-red-500 text-sm">{errors.rating}</p>}
                    </div>

                    {/* Description */}
                    <div className="sm:col-span-2">
                        <textarea
                            rows="3"
                            name="room_desc"
                            value={form.room_desc}
                            onChange={handleChange}
                            placeholder="Room description"
                            className="border px-3 py-2 rounded w-full"
                        />
                        {errors.room_desc && <p className="text-red-500 text-sm">{errors.room_desc}</p>}
                    </div>

                    {/* Image Upload Area */}
                    <div className="sm:col-span-2">
                        <div
                            onDragOver={(e) => {
                                e.preventDefault();
                                setDragActive(true);
                            }}
                            onDragLeave={() => setDragActive(false)}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current.click()}
                            className={`border-2 border-dashed p-6 text-center rounded-lg cursor-pointer transition ${dragActive ? "border-slate-900 bg-slate-50" : "border-gray-300"
                                }`}
                        >
                            <p className="text-gray-500">
                                Drag & Drop images here or click to upload
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
                            <p className="text-red-500 text-sm mt-2">{errors.images}</p>
                        )}
                    </div>

                    {/* Image Preview */}
                    <div className="sm:col-span-2 flex flex-wrap gap-4 mt-3">
                        {existingImages.map((img) => (
                            <div key={img} className="relative">
                                <img
                                    src={IMAGE_BASE + img}
                                    className="w-28 h-24 object-cover rounded"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeExistingImage(img)}
                                    className="absolute -top-2 -right-2 bg-red-600 text-white w-6 h-6 rounded-full text-xs"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}

                        {newImages.map((img, i) => (
                            <div key={i} className="relative">
                                <img
                                    src={URL.createObjectURL(img)}
                                    className="w-28 h-24 object-cover rounded"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeNewImage(i)}
                                    className="absolute -top-2 -right-2 bg-black text-white w-6 h-6 rounded-full text-xs"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Availability */}
                    <label className="sm:col-span-2 flex gap-2 items-center">
                        <input
                            type="checkbox"
                            name="availability"
                            checked={form.availability}
                            onChange={handleChange}
                        />
                        Available
                    </label>

                    {/* Buttons */}
                    <div className="sm:col-span-2 flex justify-end gap-3 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="border px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                        <button className="bg-slate-900 text-white px-6 py-2 rounded hover:bg-black transition">
                            Save Room
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RoomForm;
