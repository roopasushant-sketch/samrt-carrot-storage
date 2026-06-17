const SensorData = require('../models/SensorData');
const Setting = require('../models/Setting');
const Device = require('../models/Device');
const Alert = require('../models/Alert');
const { getIo } = require('../services/socketService');

// Helper to create and broadcast an alert
const createAlert = async (type, message, source) => {
  const alert = await Alert.create({ type, message, source });
  const io = getIo();
  io.emit('newAlert', alert);
  return alert;
};

// @desc    Receive sensor data from ESP32
// @route   POST /api/sensor/data
// @access  Public (In production, use an API key or token for hardware)
const receiveSensorData = async (req, res) => {
  const { Temperature, Humidity, 'Ethylene Gas': Ethylene, 'Fan Status': FanStatus, 'Relay Status': RelayStatus, 'Buzzer Status': BuzzerStatus } = req.body;

  try {
    // 1. Get current settings
    let settings = await Setting.findOne();
    if (!settings) {
      settings = await Setting.create({}); // Create default if doesn't exist
    }

    // 2. Check if Simulation mode is active. If so, ignore ESP32 data.
    if (settings.isSimulationMode) {
      return res.status(200).json({ success: true, message: 'Simulation mode active. Hardware data ignored.' });
    }

    // 3. Save Sensor Data
    const newData = await SensorData.create({
      temperature: Temperature,
      humidity: Humidity,
      ethylene: Ethylene
    });

    // 4. Broadcast live data to clients
    const io = getIo();
    io.emit('sensorData', {
      temperature: Temperature,
      humidity: Humidity,
      ethylene: Ethylene,
      fanStatus: FanStatus,
      relayStatus: RelayStatus,
      buzzerStatus: BuzzerStatus,
      esp32Status: 'online'
    });

    // 5. Update or Create Device Status
    let device = await Device.findOne({ deviceId: 'ESP32_MASTER' });
    if (!device) {
      device = await Device.create({ deviceId: 'ESP32_MASTER' });
    }
    device.status = 'online';
    device.lastHeartbeat = Date.now();
    device.fanStatus = FanStatus;
    device.relayStatus = RelayStatus;
    device.buzzerStatus = BuzzerStatus;

    // 6. Spoilage Prevention Logic
    let commandFan = false;
    let commandRelay = false;
    let commandBuzzer = false;
    let thresholdsExceeded = false;

    if (Temperature > settings.tempThreshold) {
      commandFan = true;
      thresholdsExceeded = true;
      await createAlert('Warning', `Temperature exceeded ${settings.tempThreshold}°C`, 'Temperature');
    }

    if (Humidity > settings.humidityThreshold) {
      commandFan = true;
      thresholdsExceeded = true;
      await createAlert('Warning', `Humidity exceeded ${settings.humidityThreshold}%`, 'Humidity');
    }

    if (Ethylene > settings.ethyleneThreshold) {
      commandFan = true;
      commandRelay = true;
      commandBuzzer = true;
      thresholdsExceeded = true;
      await createAlert('Critical', `Ethylene gas exceeded ${settings.ethyleneThreshold} ppm! Spoiling risk!`, 'Ethylene');
    }

    // If safe, we turn them off
    if (!thresholdsExceeded) {
      commandFan = false;
      commandRelay = false;
      commandBuzzer = false;
    }

    // Update DB with the commanded state
    device.fanStatus = commandFan;
    device.relayStatus = commandRelay;
    device.buzzerStatus = commandBuzzer;
    await device.save();

    // 7. Send Response back to ESP32 with Commands
    // The ESP32 parses this JSON and turns on/off its actual GPIO pins
    res.status(200).json({
      success: true,
      commands: {
        fan: commandFan,
        relay: commandRelay,
        buzzer: commandBuzzer
      }
    });

  } catch (error) {
    console.error(`Error processing sensor data: ${error.message}`);
    // Generate communication error alert
    await createAlert('Critical', `Communication error: ${error.message}`, 'System');
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { receiveSensorData };
