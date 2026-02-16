const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * USER SIGNUP
 * Required: name, email, password
 */
const userSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1️⃣ Validate input
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        // 2️⃣ Check existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists",
            });
        }

        // 3️⃣ Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4️⃣ Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // 5️⃣ Response
        res.status(201).json({
            message: "User registered successfully",
            userId: user._id,
        });
    } catch (error) {
        res.status(500).json({
            message: "User signup failed",
            error: error.message,
        });
    }
};

/**
 * USER LOGIN
 * Required: email, password
 */
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1️⃣ Validate input
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        // 2️⃣ Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }

        // 3️⃣ Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }

        // 4️⃣ Generate USER JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.USER_JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE }
        );

        // 5️⃣ Response
        res.status(200).json({
            message: "User login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "User login failed",
            error: error.message,
        });
    }
};

module.exports = {
    userSignup,
    userLogin,
};
