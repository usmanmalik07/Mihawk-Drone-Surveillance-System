const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./database/db'); // MongoDB connection
const userRoutes = require('./routes/userRoutes'); // Import user routes

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 5000;

// Middleware setup
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse JSON data from incoming requests

// MongoDB connection
connectDB(); // Connect to MongoDB database

// User routes (CRUD API for user-related operations)
app.use('/api/users', userRoutes);

// Example API endpoint
app.get('/api/data', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Global error handling for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'API route not found' });
});

// Error handling middleware (for other errors like 500)
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging
  res.status(500).json({ message: 'Something went wrong, please try again.' });
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
