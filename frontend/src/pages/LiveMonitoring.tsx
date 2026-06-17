import React, { useState, useEffect } from 'react';
import { useSocket } from '../contexts/SocketContext';
import { motion } from 'framer-motion';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine 
} from 'recharts';
import { FiDownload } from 'react-icons/fi';

interface ChartDataPoint {
  time: string;
  temperature: number;
  humidity: number;
  ethylene: number;
}

export const LiveMonitoring: React.FC = () => {
  const { sensorData } = useSocket();
  const [dataHistory, setDataHistory] = useState<ChartDataPoint[]>([]);

  useEffect(() => {
    setDataHistory(prev => {
      const now = new Date();
      const timeStr = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
      
      const newPoint = {
        time: timeStr,
        temperature: sensorData.temperature,
        humidity: sensorData.humidity,
        ethylene: sensorData.ethylene
      };

      // Keep last 30 points
      const newHistory = [...prev, newPoint];
      if (newHistory.length > 30) {
        newHistory.shift();
      }
      return newHistory;
    });
  }, [sensorData]);

  const handleExportCSV = () => {
    const headers = ['Time', 'Temperature', 'Humidity', 'Ethylene'];
    const csvContent = [
      headers.join(','),
      ...dataHistory.map(row => `${row.time},${row.temperature},${row.humidity},${row.ethylene}`)
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `sensor_data_${new Date().toISOString()}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Live Trends</h2>
          <p className="text-gray-500">Real-time charting of sensor data</p>
        </div>
        <button 
          onClick={handleExportCSV}
          className="px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"
        >
          <FiDownload /> Export CSV
        </button>
      </div>

      {/* Temperature Chart */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 rounded-2xl h-96"
      >
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-orange-500"></span>
          Temperature Trend (°C)
        </h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dataHistory} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.2} />
            <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} />
            <YAxis stroke="#9ca3af" fontSize={12} domain={[0, 40]} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.8)', borderColor: 'transparent', borderRadius: '8px', color: '#fff' }}
              itemStyle={{ color: '#fff' }}
            />
            <Legend />
            <ReferenceLine y={30} label="Critical High" stroke="red" strokeDasharray="3 3" />
            <Line type="monotone" dataKey="temperature" stroke="#f97316" strokeWidth={3} dot={false} activeDot={{ r: 8 }} animationDuration={300} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Humidity Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-6 rounded-2xl h-80"
        >
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
            Humidity Trend (%)
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dataHistory} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.2} />
              <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} domain={[0, 100]} />
              <Tooltip contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.8)', borderRadius: '8px', color: '#fff' }} />
              <Line type="monotone" dataKey="humidity" stroke="#3b82f6" strokeWidth={3} dot={false} activeDot={{ r: 8 }} animationDuration={300} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Ethylene Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-6 rounded-2xl h-80"
        >
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-purple-500"></span>
            Ethylene Gas Trend (ppm)
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dataHistory} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.2} />
              <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} domain={[0, 5]} />
              <Tooltip contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.8)', borderRadius: '8px', color: '#fff' }} />
              <ReferenceLine y={2.0} label="Threshold" stroke="red" strokeDasharray="3 3" />
              <Line type="monotone" dataKey="ethylene" stroke="#a855f7" strokeWidth={3} dot={false} activeDot={{ r: 8 }} animationDuration={300} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};
