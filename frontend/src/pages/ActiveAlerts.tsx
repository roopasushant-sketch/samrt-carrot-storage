import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertTriangle, FiAlertCircle, FiInfo, FiCheckCircle } from 'react-icons/fi';

interface Alert {
  id: string;
  severity: 'Critical' | 'Warning' | 'Information';
  description: string;
  timestamp: string;
  status: 'Active' | 'Resolved';
}

const mockAlerts: Alert[] = [
  { id: '1', severity: 'Critical', description: 'Temperature exceeded 30°C threshold (Current: 31.2°C)', timestamp: new Date().toISOString(), status: 'Active' },
  { id: '2', severity: 'Warning', description: 'Ethylene gas levels rising above 1.0 ppm', timestamp: new Date(Date.now() - 3600000).toISOString(), status: 'Active' },
  { id: '3', severity: 'Information', description: 'System reboot successful', timestamp: new Date(Date.now() - 7200000).toISOString(), status: 'Resolved' },
  { id: '4', severity: 'Critical', description: 'ESP32 Device Offline - Connection lost', timestamp: new Date(Date.now() - 86400000).toISOString(), status: 'Resolved' },
];

export const ActiveAlerts: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);

  const resolveAlert = (id: string) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, status: 'Resolved' } : a));
  };

  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case 'Critical': return { icon: FiAlertTriangle, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20', border: 'border-red-200 dark:border-red-800' };
      case 'Warning': return { icon: FiAlertCircle, color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/20', border: 'border-yellow-200 dark:border-yellow-800' };
      case 'Information': return { icon: FiInfo, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800' };
      default: return { icon: FiInfo, color: 'text-gray-500', bg: 'bg-gray-50 dark:bg-gray-800', border: 'border-gray-200 dark:border-gray-700' };
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Active Alerts</h2>
        <p className="text-gray-500">System warnings and critical notifications</p>
      </div>

      <div className="grid gap-4">
        <AnimatePresence>
          {alerts.map((alert) => {
            const style = getSeverityStyle(alert.severity);
            const isResolved = alert.status === 'Resolved';
            
            return (
              <motion.div
                key={alert.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`p-6 rounded-2xl border ${isResolved ? 'bg-gray-50 dark:bg-slate-800/50 border-gray-200 dark:border-gray-700 opacity-60' : `${style.bg} ${style.border}`} transition-all`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full ${isResolved ? 'bg-gray-200 dark:bg-slate-700 text-gray-500' : 'bg-white dark:bg-slate-800 ' + style.color} shadow-sm`}>
                    <style.icon className="w-6 h-6" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-lg flex items-center gap-2">
                        {alert.severity} Alert
                        {isResolved && <span className="text-xs px-2 py-1 bg-gray-200 dark:bg-slate-700 rounded-full font-medium">Resolved</span>}
                      </h3>
                      <span className="text-sm text-gray-500">{new Date(alert.timestamp).toLocaleString()}</span>
                    </div>
                    <p className={`mb-4 ${isResolved ? 'text-gray-500' : 'text-gray-800 dark:text-gray-200'}`}>
                      {alert.description}
                    </p>
                    
                    {!isResolved && (
                      <button 
                        onClick={() => resolveAlert(alert.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                      >
                        <FiCheckCircle className="text-green-500" /> Mark as Resolved
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        {alerts.length === 0 && (
          <div className="text-center p-12 glass-panel rounded-2xl text-gray-500">
            <FiCheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500 opacity-50" />
            <h3 className="text-xl font-bold mb-2">All Clear!</h3>
            <p>There are no active alerts at this time.</p>
          </div>
        )}
      </div>
    </div>
  );
};
