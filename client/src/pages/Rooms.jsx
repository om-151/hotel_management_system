import React, { useEffect, useMemo, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Search, MapPin } from "lucide-react";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [maxPrice, setMaxPrice] = useState("");
  const [availableOnly, setAvailableOnly] = useState(false);

  const IMAGE_BASE = "http://localhost:5000/";
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/rooms")
      .then((res) => {
        setRooms(res.data.rooms);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Unique Room Types
  const roomTypes = ["all", ...new Set(rooms.map((r) => r.room_type))];

  // Filtering Logic
  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const matchesSearch =
        room.name.toLowerCase().includes(search.toLowerCase()) ||
        room.city.toLowerCase().includes(search.toLowerCase());

      const matchesType =
        type === "all" || room.room_type === type;

      const matchesPrice =
        !maxPrice || room.price <= Number(maxPrice);

      const matchesAvailability =
        !availableOnly || room.availability;

      return (
        matchesSearch &&
        matchesType &&
        matchesPrice &&
        matchesAvailability
      );
    });
  }, [rooms, search, type, maxPrice, availableOnly]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading rooms...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50 pt-28 pb-16 px-4 sm:px-6">

      <div className="max-w-7xl mx-auto">

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-amber-600">
            Discover Your Perfect Stay
          </h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Explore premium rooms with luxury comfort and unbeatable pricing.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="bg-white/70 backdrop-blur-xl shadow-lg rounded-3xl p-6 mb-12 border border-white/40">

          <div className="grid md:grid-cols-4 gap-4">

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search by name or city..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-400 outline-none cursor-pointer"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Room Type */}
            <select
              className="w-full py-3 px-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-400 outline-none cursor-pointer"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              {roomTypes.map((t, i) => (
                <option key={i} value={t}>
                  {t}
                </option>
              ))}
            </select>

            {/* Max Price */}
            <input
              type="number"
              placeholder="Max Price"
              className="w-full py-3 px-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-400 outline-none cursor-pointer"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />

            {/* Availability */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={availableOnly}
                onChange={() => setAvailableOnly(!availableOnly)}
                className="w-5 h-5 accent-amber-600 cursor-pointer"
              />
              <span className="text-gray-700">Available Only</span>
            </div>

          </div>
        </div>

        {/* Rooms Grid */}
        {filteredRooms.length === 0 ? (
          <p className="text-center text-gray-500">
            No rooms match your search.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRooms.map((room) => (
              <div
                key={room._id}
                className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={
                      room.images?.[0]
                        ? IMAGE_BASE + room.images[0]
                        : "https://via.placeholder.com/400x250"
                    }
                    alt={room.name}
                    className="h-56 w-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <span className="absolute top-4 right-4 bg-white/90 text-amber-600 text-xs font-semibold px-3 py-1 rounded-full shadow">
                    {room.room_type}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 space-y-5">

                  {/* Title + Availability */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 capitalize">
                        {room.name}
                      </h2>

                      <p className="flex items-center gap-0.5 text-sm text-gray-500 capitalize mt-1">
                        <MapPin size={15} className="text-amber-600" />
                        {room.city}, {room.state}
                      </p>
                    </div>

                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap ${room.availability
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                        }`}
                    >
                      {room.availability ? "Available" : "Unavailable"}
                    </span>
                  </div>

                  {/* Price + View Button */}
                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-gray-400 line-through text-sm">
                        ₹{room.base_price}
                      </p>
                      <p className="text-xl sm:text-2xl font-semibold text-gray-900">
                        ₹{room.price}
                      </p>
                    </div>

                    <button
                      onClick={() => navigate(`/rooms/details/${room._id}`)}
                      className="px-5 py-2.5 rounded-full border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white transition text-sm font-semibold cursor-pointer"
                    >
                      View
                    </button>

                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Rooms;