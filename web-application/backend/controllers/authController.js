const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();

// Generate JWT Token
const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
};

// Login Function
exports.login = async (req, res) => {
    const { email, password } = req.body;
    
    try {

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found in database.");
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Password does not match");
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate Token
        const token = generateToken(user);
        console.log("Generated JWT Token:", token);

        // Store Token in Cookies
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'Strict',
            path: "/", // ✅ Important for clearing cookies during logout
        });

        res.status(200).json({ message: 'Login successful', token, role: user.role });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Logout Function
exports.logout = (req, res) => {
    res.clearCookie('token', { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        path: "/" // ✅ Ensure complete removal
    });

    res.status(200).json({ message: 'Logged out successfully' });
};
