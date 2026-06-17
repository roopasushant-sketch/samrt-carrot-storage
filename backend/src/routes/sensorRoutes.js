const express = require('express');
const { receiveSensorData } = require('../controllers/sensorController');

const router = express.Router();

router.post('/data', receiveSensorData);

module.exports = router;
