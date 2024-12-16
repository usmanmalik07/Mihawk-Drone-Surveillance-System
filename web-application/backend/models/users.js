// Import mongoose
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'operator', 'observer'], // Only these roles are allowed
    required: true,
  },
  permissions: {
    type: Array, // Array of specific permissions if needed
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update the `updatedAt` field on save
userSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;
