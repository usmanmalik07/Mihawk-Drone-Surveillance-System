const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Controller for creating a new user
const createUser = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const { name, email, password, role } = req.body;

    if (!password || !name || !email || !role) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Hash the password to store it securely in the database
    const hashedPassword = await bcrypt.hash(password, 10);

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

    res.status(201).json(userData);
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

module.exports = { createUser, getUsers };
