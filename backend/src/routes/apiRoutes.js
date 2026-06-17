const express = require('express');
const { protect, admin } = require('../middlewares/authMiddleware');
const { 
  getHistory, 
  getDeviceStatus, 
  getSettings, 
  updateSettings, 
  toggleSimulation, 
  getLogs, 
  getAlerts, 
  getReports 
} = require('../controllers/apiController');

const router = express.Router();

router.get('/history', protect, getHistory);
router.get('/device', protect, getDeviceStatus);
router.get('/settings', protect, getSettings);
router.put('/settings', protect, admin, updateSettings);
router.post('/simulation', protect, toggleSimulation);
router.get('/logs', protect, admin, getLogs);
router.get('/alerts', protect, getAlerts);
router.get('/reports', protect, getReports);

module.exports = router;
