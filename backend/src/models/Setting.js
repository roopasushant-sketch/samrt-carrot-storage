const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  tempThreshold: { type: Number, default: 30 },
  humidityThreshold: { type: Number, default: 80 },
  ethyleneThreshold: { type: Number, default: 2.0 },
  samplingInterval: { type: Number, default: 5 }, // in seconds
  emailNotifications: { type: Boolean, default: true },
  smsNotifications: { type: Boolean, default: false },
  isSimulationMode: { type: Boolean, default: false } // Controls whether backend accepts ESP32 or Mock data
}, { timestamps: true });

module.exports = mongoose.model('Setting', settingSchema);
