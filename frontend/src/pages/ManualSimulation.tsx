import React from 'react';
import { useSocket } from '../contexts/SocketContext';
import { motion } from 'framer-motion';
import { FiSliders, FiPower, FiWind, FiZap, FiRadio } from 'react-icons/fi';

export const ManualSimulation: React.FC = () => {
  const { sensorData, isSimulationMode, setSimulationMode, updateSimulationData } = useSocket();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Manual Simulation</h2>
          <p className="text-gray-500">Test dashboard behavior without hardware</p>
        </div>
        
        <div className="flex items-center gap-3 bg-white dark:bg-slate-800 p-2 rounded-xl border border-gray-200 dark:border-gray-700">
          <span className="text-sm font-medium pl-2">Real Device</span>
          <button 
            onClick={() => setSimulationMode(!isSimulationMode)}
            className={`w-14 h-7 rounded-full p-1 transition-colors relative ${isSimulationMode ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'}`}
          >
            <div className={`w-5 h-5 rounded-full bg-white transition-transform ${isSimulationMode ? 'translate-x-7' : 'translate-x-0'}`} />
          </button>
          <span className="text-sm font-medium pr-2">Simulation</span>
        </div>
      </div>

      {!isSimulationMode ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-8 rounded-2xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 text-center"
        >
          <FiPower className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-yellow-700 dark:text-yellow-400 mb-2">Simulation Disabled</h3>
          <p className="text-yellow-600 dark:text-yellow-500">
            System is currently in Real Device mode. Manual controls are disabled to prevent conflict with actual sensor readings.
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sliders */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-6 rounded-2xl space-y-8"
          >
            <h3 className="text-lg font-bold flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-4">
              <FiSliders /> Sensor Values
            </h3>

            <div>
              <div className="flex justify-between mb-2">
                <label className="font-medium text-gray-700 dark:text-gray-300">Temperature (°C)</label>
                <span className="text-primary-500 font-bold">{sensorData.temperature}</span>
              </div>
              <input 
                type="range" 
                min="-10" max="50" step="0.1" 
                value={sensorData.temperature}
                onChange={(e) => updateSimulationData({ temperature: parseFloat(e.target.value) })}
                className="w-full accent-orange-500 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="font-medium text-gray-700 dark:text-gray-300">Humidity (%)</label>
                <span className="text-primary-500 font-bold">{sensorData.humidity}</span>
              </div>
              <input 
                type="range" 
                min="0" max="100" step="1" 
                value={sensorData.humidity}
                onChange={(e) => updateSimulationData({ humidity: parseFloat(e.target.value) })}
                className="w-full accent-blue-500 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="font-medium text-gray-700 dark:text-gray-300">Ethylene Gas (ppm)</label>
                <span className="text-primary-500 font-bold">{sensorData.ethylene}</span>
              </div>
              <input 
                type="range" 
                min="0" max="10" step="0.1" 
                value={sensorData.ethylene}
                onChange={(e) => updateSimulationData({ ethylene: parseFloat(e.target.value) })}
                className="w-full accent-purple-500 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </motion.div>

          {/* Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-panel p-6 rounded-2xl"
          >
            <h3 className="text-lg font-bold flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-4 mb-6">
              <FiPower /> Manual Overrides
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => updateSimulationData({ fanStatus: !sensorData.fanStatus })}
                className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-3 transition-colors ${sensorData.fanStatus ? 'bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-900/30 dark:border-blue-800' : 'bg-gray-50 border-gray-200 text-gray-500 dark:bg-slate-800 dark:border-gray-700'}`}
              >
                <FiWind className="w-8 h-8" />
                <span className="font-bold">Fan {sensorData.fanStatus ? 'ON' : 'OFF'}</span>
              </button>

              <button 
                onClick={() => updateSimulationData({ relayStatus: !sensorData.relayStatus })}
                className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-3 transition-colors ${sensorData.relayStatus ? 'bg-orange-50 border-orange-200 text-orange-600 dark:bg-orange-900/30 dark:border-orange-800' : 'bg-gray-50 border-gray-200 text-gray-500 dark:bg-slate-800 dark:border-gray-700'}`}
              >
                <FiZap className="w-8 h-8" />
                <span className="font-bold">Relay {sensorData.relayStatus ? 'ON' : 'OFF'}</span>
              </button>

              <button 
                onClick={() => updateSimulationData({ buzzerStatus: !sensorData.buzzerStatus })}
                className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-3 transition-colors ${sensorData.buzzerStatus ? 'bg-red-50 border-red-200 text-red-600 dark:bg-red-900/30 dark:border-red-800' : 'bg-gray-50 border-gray-200 text-gray-500 dark:bg-slate-800 dark:border-gray-700'}`}
              >
                <FiRadio className="w-8 h-8" />
                <span className="font-bold">Buzzer {sensorData.buzzerStatus ? 'ON' : 'OFF'}</span>
              </button>

              <button 
                onClick={() => {
                  updateSimulationData({ 
                    temperature: 32, 
                    humidity: 95, 
                    ethylene: 3.5,
                    buzzerStatus: true,
                    fanStatus: true,
                    relayStatus: true
                  });
                }}
                className="p-4 rounded-xl border border-red-200 bg-red-500 hover:bg-red-600 text-white flex flex-col items-center justify-center gap-3 transition-colors col-span-2 shadow-lg shadow-red-500/30"
              >
                <FiZap className="w-6 h-6" />
                <span className="font-bold">Trigger Critical Alert</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
