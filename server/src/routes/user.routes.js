const express = require("express");
const router = express.Router();

const { getAllUsers, deleteUser } = require("../controllers/user.controller");
const adminAuthMiddleware = require("../middleware/adminAuth.middleware");

// Admin only routes
router.get("/", adminAuthMiddleware, getAllUsers);
router.delete("/:id", adminAuthMiddleware, deleteUser);

module.exports = router;