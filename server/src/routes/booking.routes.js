const express = require("express");
const userAuthMiddleware = require("../middleware/userAuth.middleware");
const adminAuthMiddleware = require("../middleware/adminAuth.middleware");
const {
    createBooking,
    getMyBookings,
    cancelBooking,
    completeBooking,
    getAllBookings,
    getRoomBookings,
} = require("../controllers/booking.controller");

const router = express.Router();

// USER
router.post("/", userAuthMiddleware, createBooking);
router.get("/my-bookings", userAuthMiddleware, getMyBookings);
router.put("/:id/cancel", userAuthMiddleware, cancelBooking);
router.get("/room/:roomId", getRoomBookings);

// ADMIN
router.get("/", adminAuthMiddleware, getAllBookings);
router.put("/:id/complete", adminAuthMiddleware, completeBooking);

module.exports = router;
