const express = require('express');
const { createUser, getUsers } = require('../controllers/userController');
const { login, logout } = require('../controllers/authController'); // Import login and logout
const router = express.Router();

// POST route for creating a new user
router.post('/', createUser);

// GET route for fetching all users
router.get('/', getUsers);

// POST route for logging in a user (moved to AuthController)
router.post('/login', login);

// GET route for logging out a user
router.get('/logout', logout);

module.exports = router;
