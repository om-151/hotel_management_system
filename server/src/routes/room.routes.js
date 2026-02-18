const express = require("express");
const adminAuthMiddleware = require("../middleware/adminAuth.middleware");
const uploadRoomImages = require("../middleware/roomUpload.middleware");
const {
    createRoom,
    getAllRooms,
    updateRoom,
    deleteRoom,
    getSingleRoom,
} = require("../controllers/room.controller");

const router = express.Router();

// PUBLIC
router.get("/", getAllRooms);
router.get("/:id", getSingleRoom);

// ADMIN ONLY
router.post("/", adminAuthMiddleware, uploadRoomImages.array("images", 5), createRoom);
router.put("/:id", adminAuthMiddleware, uploadRoomImages.array("images", 5), updateRoom);
router.delete("/:id", adminAuthMiddleware, deleteRoom);

module.exports = router;
