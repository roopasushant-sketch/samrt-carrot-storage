import React from 'react';
import { useSocket } from '../contexts/SocketContext';
import { motion } from 'framer-motion';
import { 
  FiThermometer, 
  FiDroplet, 
  FiWind, 
  FiActivity, 
  FiCpu, 
  FiZap, 
  FiWifi,
  FiClock
} from 'react-icons/fi';

export const Dashboard: React.FC = () => {
  const { sensorData, isConnected, isSimulationMode } = useSocket();

  const getStorageCondition = () => {
    if (sensorData.temperature > 30 || sensorData.humidity < 40 || sensorData.ethylene > 2.0) {
      return { text: 'Critical', color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/30' };
    }
    if (sensorData.temperature > 25 || sensorData.ethylene > 1.0) {
      return { text: 'Warning', color: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900/30' };
    }
    return { text: 'Optimal', color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' };
  };

  const condition = getStorageCondition();

  const cards = [
    {
      title: 'Temperature',
      value: `${sensorData.temperature}°C`,
      icon: FiThermometer,
      color: 'text-orange-500',
      bg: 'bg-orange-100 dark:bg-orange-900/30'
    },
    {
      title: 'Humidity',
      value: `${sensorData.humidity}%`,
      icon: FiDroplet,
      color: 'text-blue-500',
      bg: 'bg-blue-100 dark:bg-blue-900/30'
    },
    {
      title: 'Ethylene Gas',
      value: `${sensorData.ethylene} ppm`,
      icon: FiWind,
      color: 'text-purple-500',
      bg: 'bg-purple-100 dark:bg-purple-900/30'
    },
    {
      title: 'Storage Condition',
      value: condition.text,
      icon: FiActivity,
      color: condition.color,
      bg: condition.bg
    },
    {
      title: 'Fan Status',
      value: sensorData.fanStatus ? 'ON' : 'OFF',
      icon: FiWind,
      color: sensorData.fanStatus ? 'text-green-500' : 'text-gray-500',
      bg: sensorData.fanStatus ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-800'
    },
    {
      title: 'Relay Status',
      value: sensorData.relayStatus ? 'ON' : 'OFF',
      icon: FiZap,
      color: sensorData.relayStatus ? 'text-green-500' : 'text-gray-500',
      bg: sensorData.relayStatus ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-800'
    },
    {
      title: 'ESP32 Status',
      value: sensorData.esp32Status === 'online' ? 'Online' : 'Offline',
      icon: FiCpu,
      color: sensorData.esp32Status === 'online' ? 'text-green-500' : 'text-red-500',
      bg: sensorData.esp32Status === 'online' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
    },
    {
      title: 'Connection',
      value: isSimulationMode ? 'Simulation' : (isConnected ? 'Connected' : 'Disconnected'),
      icon: FiWifi,
      color: isConnected || isSimulationMode ? 'text-primary-500' : 'text-red-500',
      bg: isConnected || isSimulationMode ? 'bg-primary-100 dark:bg-primary-900/30' : 'bg-red-100 dark:bg-red-900/30'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${isConnected || isSimulationMode ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
          <span className="font-medium">System Status: {isConnected || isSimulationMode ? 'Active' : 'Inactive'}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <FiClock />
          <span>Last Updated: {new Date(sensorData.lastUpdated).toLocaleTimeString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="glass-panel p-6 rounded-2xl hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.bg}`}>
                <card.icon className={`w-6 h-6 ${card.color}`} />
              </div>
            </div>
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">{card.title}</h3>
            <p className="text-2xl font-bold">{card.value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
