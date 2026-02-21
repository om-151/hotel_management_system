const Contact = require("../models/Contact");


// ================= CREATE CONTACT =================
const createContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newContact = await Contact.create({
            name,
            email,
            subject,
            message,
        });

        res.status(201).json({
            success: true,
            message: "Message sent successfully",
            data: newContact,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// ================= GET ALL CONTACTS (ADMIN) =================
const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            total: contacts.length,
            data: contacts,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// ================= DELETE CONTACT (ADMIN) =================
const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({ message: "Message not found" });
        }

        await contact.deleteOne();

        res.status(200).json({
            success: true,
            message: "Message deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createContact,
    getAllContacts,
    deleteContact,
};