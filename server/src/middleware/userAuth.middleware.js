const jwt = require("jsonwebtoken");

const userAuthMiddleware = (req, res, next) => {
    try {
        // 1️⃣ Get token from header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Authorization token missing",
            });
        }

        const token = authHeader.split(" ")[1];

        // 2️⃣ Verify token
        const decoded = jwt.verify(token, process.env.USER_JWT_SECRET);

        // 3️⃣ Attach user info to request
        req.user = {
            userId: decoded.userId,
        };

        // 4️⃣ Continue
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }
};

module.exports = userAuthMiddleware;
