import React from 'react';
import { useSocket } from '../contexts/SocketContext';
import { motion } from 'framer-motion';
import { FiCpu, FiWifi, FiZap, FiWind, FiRadio } from 'react-icons/fi';

export const DeviceStatus: React.FC = () => {
  const { sensorData, isConnected, isSimulationMode } = useSocket();

  const isOnline = isSimulationMode ? true : (isConnected && sensorData.esp32Status === 'online');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Device Status</h2>
        <p className="text-gray-500">Hardware connectivity and diagnostics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Main Node Status */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-6 rounded-2xl"
        >
          <div className="flex items-center justify-between mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl ${isOnline ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                <FiCpu className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold">ESP32 Master Node</h3>
                <p className="text-sm text-gray-500">ID: SC-ESP32-A1B2</p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${isOnline ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-slate-800">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <FiWifi /> Wi-Fi Status
              </div>
              <span className="font-medium text-green-500">Connected (SSID: Storage_Net)</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-slate-800">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <FiRadio /> Signal Strength
              </div>
              <span className="font-medium text-green-500">-58 dBm (Excellent)</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-slate-800">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <FiZap /> Power Supply
              </div>
              <span className="font-medium text-green-500">Mains (5.0V)</span>
            </div>
          </div>
        </motion.div>

        {/* Peripherals Status */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-6 rounded-2xl"
        >
          <h3 className="text-lg font-bold mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
            Connected Peripherals
          </h3>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 rounded-xl border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${sensorData.fanStatus ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                  <FiWind className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">Exhaust Fan</p>
                  <p className="text-xs text-gray-500">Relay Channel 1</p>
                </div>
              </div>
              <span className={`font-bold ${sensorData.fanStatus ? 'text-green-500' : 'text-gray-500'}`}>
                {sensorData.fanStatus ? 'RUNNING' : 'STOPPED'}
              </span>
            </div>

            <div className="flex justify-between items-center p-4 rounded-xl border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${sensorData.relayStatus ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-500'}`}>
                  <FiZap className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">Ethylene Scrubber</p>
                  <p className="text-xs text-gray-500">Relay Channel 2</p>
                </div>
              </div>
              <span className={`font-bold ${sensorData.relayStatus ? 'text-green-500' : 'text-gray-500'}`}>
                {sensorData.relayStatus ? 'ACTIVE' : 'INACTIVE'}
              </span>
            </div>

            <div className="flex justify-between items-center p-4 rounded-xl border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${sensorData.buzzerStatus ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-gray-100 text-gray-500'}`}>
                  <FiRadio className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">Warning Buzzer</p>
                  <p className="text-xs text-gray-500">GPIO 23</p>
                </div>
              </div>
              <span className={`font-bold ${sensorData.buzzerStatus ? 'text-red-500' : 'text-gray-500'}`}>
                {sensorData.buzzerStatus ? 'SOUNDING' : 'SILENT'}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
