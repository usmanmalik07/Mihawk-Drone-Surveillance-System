const mongoose = require('mongoose');

const threatDetectionSchema = new mongoose.Schema({
  item: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  frame: { type: String, required: true },
  location: {
    lat: { type: Number },
    lon: { type: Number }
  },
  verified: { type: Boolean, default: false },
  verified_by: { type: String },
  verified_at: { type: Date },
  operation_id: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('ThreatDetection', threatDetectionSchema);