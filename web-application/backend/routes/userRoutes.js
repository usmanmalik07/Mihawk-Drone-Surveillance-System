const express = require('express');
const { createUser, getUsers, loginUser } = require('../controllers/userController');
const router = express.Router();

// POST route for creating a new user
router.post('/', createUser);

// GET route for fetching all users
router.get('/', getUsers);

// POST route for logging in a user
router.post('/login', loginUser);

module.exports = router;