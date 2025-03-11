const jwt = require('jsonwebtoken');

// Middleware to authenticate user using JWT stored in cookies
const authenticateToken = (req, res, next) => {
    const token = req.cookies?.token; // 
    if (!token) return res.status(401).json({ message: 'Access denied, token missing' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded user data to request
        next();
    } catch (err) {
        res.status(403).json({ message: 'Invalid token' });
    }
};

// Middleware to authorize user based on role
const authorizeRole = (roles) => (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied, insufficient permissions' });
    }
    next();
};

// Middleware to log out user by clearing JWT from cookies
const logout = (req, res) => {
    res.clearCookie('token', { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'Strict',
        path: "/" // ✅ Ensures proper deletion
    });

    res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = { authenticateToken, authorizeRole, logout };
