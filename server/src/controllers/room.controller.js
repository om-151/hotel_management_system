const fs = require("fs");
const path = require("path");
const Room = require("../models/Room");

/**
 * CREATE ROOM (ADMIN ONLY)
 */
const createRoom = async (req, res) => {
    try {
        const {
            name,
            price,
            base_price,
            rating,
            availability,
            city,
            state,
            room_type,
            room_desc, // ✅ NEW
        } = req.body;

        if (!name || !price || !base_price || !city || !state || !room_type) {
            return res.status(400).json({
                message: "Missing required room fields",
            });
        }

        // ✅ collect image paths
        const images = req.files
            ? req.files.map((file) => file.path)
            : [];

        const room = await Room.create({
            name,
            price,
            base_price,
            rating,
            availability,
            city,
            state,
            room_type,
            room_desc,
            images,
        });

        res.status(201).json({
            message: "Room created successfully",
            room,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create room",
            error: error.message,
        });
    }
};

/**
 * GET ALL ROOMS (PUBLIC)
 */
const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find().sort({ createdAt: -1 });

        res.status(200).json({
            rooms,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch rooms",
            error: error.message,
        });
    }
};

/**
 * UPDATE ROOM (ADMIN ONLY)
 */
const updateRoom = async (req, res) => {
    try {
        const roomId = req.params.id;

        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({
                message: "Room not found",
            });
        }

        const {
            name,
            price,
            base_price,
            rating,
            availability,
            city,
            state,
            room_type,
            room_desc,
        } = req.body;

        // -------------------------
        // Handle Removed Images
        // -------------------------
        let removedImages = [];
        if (req.body.removedImages) {
            removedImages = JSON.parse(req.body.removedImages);
        }

        // remove deleted images from disk
        removedImages.forEach((imgPath) => {
            const fullPath = path.join(__dirname, "..", imgPath);
            if (fs.existsSync(fullPath)) {
                fs.unlinkSync(fullPath);
            }
        });

        // filter out removed images from DB array
        const remainingImages = room.images.filter(
            (img) => !removedImages.includes(img)
        );

        // -------------------------
        // Handle New Uploaded Images
        // -------------------------
        const newImages = req.files
            ? req.files.map((file) => file.path)
            : [];

        // merge old + new
        const updatedImages = [...remainingImages, ...newImages];

        // -------------------------
        // Update Room
        // -------------------------
        const updatedRoom = await Room.findByIdAndUpdate(
            roomId,
            {
                name,
                price,
                base_price,
                rating,
                availability,
                city,
                state,
                room_type,
                room_desc,
                images: updatedImages,
            },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            message: "Room updated successfully",
            room: updatedRoom,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update room",
            error: error.message,
        });
    }
};

/**
 * DELETE ROOM (ADMIN ONLY)
 */
const deleteRoom = async (req, res) => {
    try {
        const roomId = req.params.id;

        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({
                message: "Room not found",
            });
        }

        await Room.findByIdAndDelete(roomId);

        res.status(200).json({
            message: "Room deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete room",
            error: error.message,
        });
    }
};

module.exports = {
    createRoom,
    getAllRooms,
    updateRoom,
    deleteRoom,
};
