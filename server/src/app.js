const express = require("express");
const cors = require("cors");
const path = require("path");

const adminAuthRoutes = require("./routes/adminAuth.routes");
const userAuthRoutes = require("./routes/userAuth.routes");
const bookingRoutes = require("./routes/booking.routes");
const roomRoutes = require("./routes/room.routes");
const userRoutes = require("./routes/user.routes");
const contactRoutes = require("./routes/contact.routes");

const app = express();


app.use(cors({
    origin: [
        "http://localhost:5173", // user app
        "http://localhost:5174"  // admin app
    ],
    credentials: true
}));

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// auth routes
app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/user/auth", userAuthRoutes);

// booking routes
app.use("/api/bookings", bookingRoutes);

// room routes
app.use("/api/rooms", roomRoutes);

// contact routes
app.use("/api/contacts", contactRoutes);

// user routes
app.use("/api/users", userRoutes);

module.exports = app;
