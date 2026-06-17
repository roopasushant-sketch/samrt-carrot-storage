import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FiSave, FiSettings, FiBell } from 'react-icons/fi';

export const Settings: React.FC = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      tempThreshold: 30,
      humidityThreshold: 40,
      ethyleneThreshold: 2.0,
      samplingInterval: 5,
      emailNotifications: true,
      smsNotifications: false,
    }
  });

  const onSubmit = (data: any) => {
    alert(`Settings saved:\n${JSON.stringify(data, null, 2)}`);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold">System Settings</h2>
        <p className="text-gray-500">Configure application thresholds and preferences</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Threshold Settings */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-6 rounded-2xl"
        >
          <h3 className="text-lg font-bold flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-4 mb-6">
            <FiSettings /> Hardware Thresholds
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Max Temperature (°C)</label>
              <input 
                {...register('tempThreshold')}
                type="number" 
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-slate-900/50 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Min Humidity (%)</label>
              <input 
                {...register('humidityThreshold')}
                type="number" 
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-slate-900/50 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Max Ethylene Gas (ppm)</label>
              <input 
                {...register('ethyleneThreshold')}
                type="number" step="0.1"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-slate-900/50 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Sampling Interval (seconds)</label>
              <input 
                {...register('samplingInterval')}
                type="number" 
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-slate-900/50 outline-none"
              />
            </div>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-6 rounded-2xl"
        >
          <h3 className="text-lg font-bold flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-4 mb-6">
            <FiBell /> Notification Preferences
          </h3>
          
          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
              <div>
                <p className="font-bold">Email Notifications</p>
                <p className="text-sm text-gray-500">Receive daily reports and critical alerts</p>
              </div>
              <input type="checkbox" {...register('emailNotifications')} className="w-5 h-5 accent-primary-500 rounded" />
            </label>

            <label className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
              <div>
                <p className="font-bold">SMS Notifications</p>
                <p className="text-sm text-gray-500">Receive SMS only for critical hardware failures</p>
              </div>
              <input type="checkbox" {...register('smsNotifications')} className="w-5 h-5 accent-primary-500 rounded" />
            </label>
          </div>
        </motion.div>

        <div className="flex justify-end">
          <button 
            type="submit"
            className="flex items-center gap-2 px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl shadow-lg shadow-primary-500/30 transition-colors"
          >
            <FiSave /> Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};
