const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  deviceId: { type: String, required: true, unique: true }, // e.g., 'ESP32_MASTER'
  status: { type: String, enum: ['online', 'offline'], default: 'offline' },
  fanStatus: { type: Boolean, default: false },
  relayStatus: { type: Boolean, default: false },
  buzzerStatus: { type: Boolean, default: false },
  lastHeartbeat: { type: Date, default: Date.now },
  signalStrength: { type: String, default: '-0 dBm' },
  uptime: { type: Number, default: 0 } // in seconds
}, { timestamps: true });

module.exports = mongoose.model('Device', deviceSchema);
