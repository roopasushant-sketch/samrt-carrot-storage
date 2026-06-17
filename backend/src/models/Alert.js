const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  type: { type: String, enum: ['Critical', 'Warning', 'Info'], required: true },
  message: { type: String, required: true },
  source: { type: String, required: true }, // e.g., 'Temperature', 'Ethylene', 'System'
  resolved: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Alert', alertSchema);
