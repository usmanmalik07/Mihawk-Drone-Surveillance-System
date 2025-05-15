const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
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

// Forgot Password
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
  
    try {
        const user = await User.findOne({ email });
  
        if (!user) return res.status(404).json({ message: 'User not found' });
  
        // Generate a reset token
        const token = crypto.randomBytes(32).toString('hex');
  
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  
        await user.save();
  
        // Nodemailer transport
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // Your Gmail address
                pass: process.env.EMAIL_PASS, // Your App Password (not your Gmail login password)
            },
        });
  
        const resetLink = `http://localhost:3000/reset-password/${token}`; // ✅ adjust for frontend URL
  
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Password Reset',
            html: `
              <p>You requested a password reset.</p>
              <p>Click <a href="${resetLink}">here</a> to reset your password. This link will expire in 1 hour.</p>
            `,
        };
  
        await transporter.sendMail(mailOptions);
  
        res.status(200).json({ message: 'Password reset email sent' });
    } catch (err) {
        console.error("Forgot Password Error:", err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Reset Password
exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
  
    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }, // Still valid
        });
  
        if (!user) return res.status(400).json({ message: 'Invalid or expired token' });
  
        const hashedPassword = await bcrypt.hash(password, 12);
  
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
  
        await user.save();
  
        res.status(200).json({ message: 'Password reset successful' });
    } catch (err) {
        console.error("Reset Password Error:", err);
        res.status(500).json({ message: 'Server error' });
    }
};
