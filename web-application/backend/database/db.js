const mongoose = require('mongoose');
require('dotenv').config();  

const connectDB = async () => {
  try {
    const connectionString = process.env.MONGO_URI;  
    
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
