import React from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiFileText, FiBarChart2, FiPieChart } from 'react-icons/fi';

export const Reports: React.FC = () => {
  const reportCards = [
    { title: 'Daily Report', desc: 'Summary of the last 24 hours', icon: FiFileText, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    { title: 'Weekly Report', desc: 'Trend analysis for the past 7 days', icon: FiBarChart2, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' },
    { title: 'Monthly Report', desc: 'Comprehensive monthly overview', icon: FiPieChart, color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/30' },
  ];

  const handleDownload = (type: string, format: string) => {
    // Mock download action
    alert(`Downloading ${type} in ${format} format...`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">System Reports</h2>
        <p className="text-gray-500">Generate and download performance insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reportCards.map((report, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel p-6 rounded-2xl flex flex-col items-center text-center hover:shadow-xl transition-shadow"
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${report.bg} mb-4`}>
              <report.icon className={`w-8 h-8 ${report.color}`} />
            </div>
            <h3 className="text-xl font-bold mb-2">{report.title}</h3>
            <p className="text-gray-500 mb-6">{report.desc}</p>
            
            <div className="w-full space-y-3 mt-auto">
              <button 
                onClick={() => handleDownload(report.title, 'PDF')}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-600 rounded-xl font-medium transition-colors"
              >
                <FiDownload /> Download PDF
              </button>
              <button 
                onClick={() => handleDownload(report.title, 'CSV')}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/40 text-green-600 rounded-xl font-medium transition-colors"
              >
                <FiDownload /> Download CSV
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-panel p-6 rounded-2xl mt-8"
      >
        <h3 className="text-lg font-bold mb-4">Summary Statistics (This Month)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-gray-700">
            <p className="text-sm text-gray-500 mb-1">Avg Temperature</p>
            <p className="text-2xl font-bold">24.2°C</p>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-gray-700">
            <p className="text-sm text-gray-500 mb-1">Avg Humidity</p>
            <p className="text-2xl font-bold">58.4%</p>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-gray-700">
            <p className="text-sm text-gray-500 mb-1">Total Alerts</p>
            <p className="text-2xl font-bold text-red-500">12</p>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-gray-700">
            <p className="text-sm text-gray-500 mb-1">Device Uptime</p>
            <p className="text-2xl font-bold text-green-500">99.8%</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
