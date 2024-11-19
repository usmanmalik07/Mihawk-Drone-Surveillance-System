const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./database/db'); 

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
connectDB(); 

// Example API endpoint
app.get('/api/data', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
