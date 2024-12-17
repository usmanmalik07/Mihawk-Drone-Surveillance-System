const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Controller for creating a new user
const createUser = async (req, res) => {
  try {
    console.log("Request Body:", req.body);  // Add this to inspect incoming data
    
    const { name, email, password, role } = req.body;

    if (!password || !name || !email || !role) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Hash the password to store it securely in the database
    const hashedPassword = await bcrypt.hash(password, 10);  // Ensure password is not undefined

    // Create the new user object
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Save the user in the database
    await newUser.save();

    // Respond with the created user, excluding the password
    const { password: _, ...userData } = newUser.toObject();

    res.status(201).json(userData); // Send the user data excluding the password
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Error creating user. Please try again.' });
  }
};

// Controller for fetching all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error, please try again' });
  }
};

// Controller for logging in a user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials.' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials.' });
    }

    // Exclude the password field from the response
    const { password: _, ...userData } = user.toObject();

    // Return the user data (no password) and their role
    res.status(200).json({
      user: userData,
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Error logging in, please try again.' });
  }
};

module.exports = { createUser, getUsers, loginUser };
