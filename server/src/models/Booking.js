const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        roomId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room",
            required: true,
        },
        check_in_date: {
            type: Date,
            required: true,
        },
        check_out_date: {
            type: Date,
            required: true,
        },
        booking_status: {
            type: String,
            enum: ["confirmed", "cancelled", "completed"],
            default: "confirmed",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
