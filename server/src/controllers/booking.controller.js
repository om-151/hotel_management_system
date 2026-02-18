const Booking = require("../models/Booking");
const Room = require("../models/Room");

/**
 * CREATE BOOKING (User only)
 */
const createBooking = async (req, res) => {
    try {
        const { roomId, check_in_date, check_out_date } = req.body;
        const userId = req.user.userId; // from userAuthMiddleware

        // 1️⃣ Validate required fields
        if (!roomId || !check_in_date || !check_out_date) {
            return res.status(400).json({
                message: "All booking fields are required",
            });
        }

        // 2️⃣ Check if room exists
        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({
                message: "Room not found",
            });
        }

        // 3️⃣ Check room availability
        if (!room.availability) {
            return res.status(400).json({
                message: "Room is not available",
            });
        }

        // 4️⃣ Create booking
        const booking = await Booking.create({
            userId,
            roomId,
            check_in_date,
            check_out_date,
            booking_status: "confirmed",
        });

        res.status(201).json({
            message: "Booking created successfully",
            booking,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create booking",
            error: error.message,
        });
    }
};

/**
 * GET LOGGED-IN USER BOOKINGS
 */
const getMyBookings = async (req, res) => {
    try {
        const userId = req.user.userId;

        const bookings = await Booking.find({ userId })
            .populate("roomId")
            .sort({ createdAt: -1 });

        res.status(200).json({
            bookings,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch bookings",
            error: error.message,
        });
    }
};

/**
 * USER: CANCEL BOOKING
 */
const cancelBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const userId = req.user.id;

        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({
                message: "Booking not found",
            });
        }

        // Ensure booking belongs to user
        if (booking.userId.toString() !== userId) {
            return res.status(403).json({
                message: "You are not allowed to cancel this booking",
            });
        }

        // Cannot cancel completed booking
        if (booking.booking_status === "completed") {
            return res.status(400).json({
                message: "Completed booking cannot be cancelled",
            });
        }

        booking.booking_status = "cancelled";
        await booking.save();

        res.status(200).json({
            message: "Booking cancelled successfully",
            booking,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to cancel booking",
            error: error.message,
        });
    }
};

/**
 * ADMIN: COMPLETE BOOKING
 */
const completeBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;

        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({
                message: "Booking not found",
            });
        }

        // Cannot complete cancelled booking
        if (booking.booking_status === "cancelled") {
            return res.status(400).json({
                message: "Cancelled booking cannot be completed",
            });
        }

        booking.booking_status = "completed";
        await booking.save();

        res.status(200).json({
            message: "Booking marked as completed",
            booking,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to complete booking",
            error: error.message,
        });
    }
};

const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate("userId", "name email")
            .populate("roomId", "roomNumber type price")
            .sort({ createdAt: -1 });

        res.status(200).json({ bookings });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch bookings",
            error: error.message,
        });
    }
};

module.exports = {
    createBooking,
    getMyBookings,
    cancelBooking,
    completeBooking,
    getAllBookings,
};
