const jwt = require("jsonwebtoken");

const adminAuthMiddleware = (req, res, next) => {
    try {
        // 1️⃣ Get authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Admin authorization token missing",
            });
        }

        // 2️⃣ Extract token
        const token = authHeader.split(" ")[1];

        // 3️⃣ Verify ADMIN token
        const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET);

        // 4️⃣ Attach admin info to request
        req.admin = {
            adminId: decoded.adminId,
        };

        // 5️⃣ Continue
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired admin token",
        });
    }
};

module.exports = adminAuthMiddleware;
