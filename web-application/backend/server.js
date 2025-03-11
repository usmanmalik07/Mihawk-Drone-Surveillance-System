const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./database/db');
const userRoutes = require('./routes/userRoutes');

dotenv.config(); 

const app = express();
const port = process.env.PORT || 5000;

// Proper CORS Configuration
app.use(cors({
    origin: "http://localhost:3000", 
    credentials: true, 
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
}));

app.use(express.json()); 
app.use(cookieParser()); 

// Connect to MongoDB
connectDB();

//  User routes
app.use('/api/users', userRoutes);

// Example API endpoint
app.get('/api/data', (req, res) => {
    res.json({ message: 'Backend is working!' });
});

// Global error handling for undefined routes
app.use((req, res, next) => {
    res.status(404).json({ message: 'API route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log error
    res.status(500).json({ message: 'Something went wrong, please try again.' });
});

// Start the server
app.listen(port, () => {
    console.log(`Backend server is running on http://localhost:${port}`);
});

// Debugging: Ensure JWT_SECRET is loaded properly
//console.log("JWT_SECRET:", process.env.JWT_SECRET);
