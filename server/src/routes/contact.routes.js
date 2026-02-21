const express = require("express");
const adminAuthMiddleware = require("../middleware/adminAuth.middleware");
const {
    createContact,
    getAllContacts,
    deleteContact,
} = require("../controllers/contact.controller");

const router = express.Router();

// Public
router.post("/", createContact);

// Admin
router.get("/", adminAuthMiddleware, getAllContacts);
router.delete("/:id", adminAuthMiddleware, deleteContact);

module.exports = router;