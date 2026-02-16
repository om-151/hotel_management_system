const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
        },
        base_price: {
            type: Number,
            required: true,
        },
        rating: {
            type: Number,
            min: 0,
            max: 5,
            default: 0,
        },
        availability: {
            type: Boolean,
            default: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        room_type: {
            type: String,
            required: true,
            enum: ["single", "double", "deluxe", "suite"],
        },
        room_desc: {
            type: String,
            trim: true,
        },
        images: {
            type: [String],
            default: [],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);
