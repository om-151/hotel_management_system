import React, { useEffect, useState } from "react";
import API from "../api/axios";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const IMAGE_BASE = "http://localhost:5000/";

  useEffect(() => {
    API.get("/rooms")
      .then((res) => {
        setRooms(res.data.rooms);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading rooms...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 mt-5">
      <div className="max-w-7xl mx-auto">

        {/* Page Title */}
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-12">
          Explore Our Rooms
        </h1>

        {/* Rooms Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
            >
              {/* Image Placeholder */}
              <img
                src={
                  room.images?.[0]
                    ? IMAGE_BASE + room.images[0]
                    : "https://via.placeholder.com/400x250?text=Room+Image"
                }
                alt={room.name}
                className="h-48 w-full object-cover"
              />

              {/* Card Content */}
              <div className="p-6 space-y-4">

                {/* Header */}
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 capitalize">
                    {room.name}
                  </h2>
                  <span className="text-sm bg-amber-100 text-amber-700 px-3 py-1 rounded-full capitalize">
                    {room.room_type}
                  </span>
                </div>

                {/* Location */}
                <p className="text-sm text-gray-500 capitalize">
                  📍 {room.city}, {room.state}
                </p>

                {/* Rating */}
                <div className="flex items-center text-sm text-gray-600">
                  ⭐ <span className="ml-1 font-medium">{room.rating}</span> / 5
                </div>

                {/* Pricing */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 line-through">
                      ₹{room.base_price}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      ₹{room.price}
                    </p>
                  </div>

                  <span
                    className={`text-sm font-medium px-3 py-1 rounded-full ${room.availability
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                      }`}
                  >
                    {room.availability ? "Available" : "Not Available"}
                  </span>
                </div>

                {/* Action Button */}
                <button
                  disabled={!room.availability}
                  className={`w-full py-3 rounded-xl font-semibold transition ${room.availability
                    ? "bg-amber-600 text-white hover:bg-amber-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                >
                  {room.availability ? "Book Now" : "Unavailable"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {rooms.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No rooms available at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default Rooms;
