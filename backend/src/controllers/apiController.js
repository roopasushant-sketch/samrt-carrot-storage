const SensorData = require('../models/SensorData');
const Device = require('../models/Device');
const Setting = require('../models/Setting');
const Alert = require('../models/Alert');
const ActivityLog = require('../models/ActivityLog');

// @desc    Get paginated historical sensor data
// @route   GET /api/dashboard/history
// @access  Private
const getHistory = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 50;
    const startIndex = (page - 1) * limit;

    const data = await SensorData.find().sort({ timestamp: -1 }).skip(startIndex).limit(limit);
    const total = await SensorData.countDocuments();

    res.status(200).json({
      success: true,
      count: data.length,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      },
      data
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get Device Status
// @route   GET /api/dashboard/device
// @access  Private
const getDeviceStatus = async (req, res) => {
  try {
    const device = await Device.findOne({ deviceId: 'ESP32_MASTER' });
    if (!device) {
      return res.status(404).json({ success: false, message: 'Device not found' });
    }
    
    // Calculate uptime if online (dummy calculation based on last heartbeat)
    const isOnline = (Date.now() - device.lastHeartbeat.getTime()) < 15000; // 15 seconds threshold
    if (!isOnline) {
      device.status = 'offline';
      await device.save();
    }

    res.status(200).json({ success: true, data: device });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get Settings
// @route   GET /api/dashboard/settings
// @access  Private
const getSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) {
      settings = await Setting.create({});
    }
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update Settings
// @route   PUT /api/dashboard/settings
// @access  Private (Admin)
const updateSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) {
      settings = await Setting.create({});
    }

    // Update fields
    Object.assign(settings, req.body);
    await settings.save();

    await ActivityLog.create({
      user: req.user._id,
      action: 'Update Settings',
      ipAddress: req.ip
    });

    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Toggle Simulation Mode
// @route   POST /api/dashboard/simulation
// @access  Private
const toggleSimulation = async (req, res) => {
  try {
    const { isSimulationMode } = req.body;
    let settings = await Setting.findOne();
    if (!settings) {
      settings = await Setting.create({});
    }
    
    settings.isSimulationMode = isSimulationMode;
    await settings.save();

    await ActivityLog.create({
      user: req.user._id,
      action: `Simulation Mode ${isSimulationMode ? 'Enabled' : 'Disabled'}`,
      ipAddress: req.ip
    });

    res.status(200).json({ success: true, message: `Simulation mode ${isSimulationMode ? 'enabled' : 'disabled'}` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get Activity Logs
// @route   GET /api/dashboard/logs
// @access  Private (Admin)
const getLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find().populate('user', 'name email').sort({ timestamp: -1 }).limit(100);
    res.status(200).json({ success: true, data: logs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get Alerts
// @route   GET /api/dashboard/alerts
// @access  Private
const getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ timestamp: -1 }).limit(50);
    res.status(200).json({ success: true, data: alerts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get Reports Data (Averages)
// @route   GET /api/dashboard/reports
// @access  Private
const getReports = async (req, res) => {
  try {
    // Generate simple averages using MongoDB Aggregation
    const stats = await SensorData.aggregate([
      {
        $group: {
          _id: null,
          avgTemperature: { $avg: '$temperature' },
          avgHumidity: { $avg: '$humidity' },
          avgEthylene: { $avg: '$ethylene' },
        }
      }
    ]);

    const totalAlerts = await Alert.countDocuments();
    const device = await Device.findOne({ deviceId: 'ESP32_MASTER' });

    res.status(200).json({
      success: true,
      data: {
        averages: stats.length > 0 ? stats[0] : null,
        totalAlerts,
        uptime: device ? device.uptime : 0
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getHistory,
  getDeviceStatus,
  getSettings,
  updateSettings,
  toggleSimulation,
  getLogs,
  getAlerts,
  getReports
};
