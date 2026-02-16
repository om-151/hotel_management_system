const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * ADMIN SIGNUP
 * Required: name, email, password
 */
const adminSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1️⃣ Validation
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        // 2️⃣ Check existing admin
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(409).json({
                message: "Admin already exists",
            });
        }

        // 3️⃣ Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4️⃣ Create admin
        const admin = await Admin.create({
            name,
            email,
            password: hashedPassword,
        });

        // 5️⃣ Response
        res.status(201).json({
            message: "Admin registered successfully",
            adminId: admin._id,
        });
    } catch (error) {
        res.status(500).json({
            message: "Admin signup failed",
            error: error.message,
        });
    }
};

/**
 * ADMIN LOGIN
 * Required: email, password
 */
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1️⃣ Validation
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        // 2️⃣ Find admin
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }

        // 3️⃣ Compare password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }

        // 4️⃣ Generate JWT token
        const token = jwt.sign(
            { adminId: admin._id },
            process.env.ADMIN_JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE }
        );

        // 5️⃣ Response
        res.status(200).json({
            message: "Admin login successful",
            token,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Admin login failed",
            error: error.message,
        });
    }
};

module.exports = {
    adminSignup,
    adminLogin,
};