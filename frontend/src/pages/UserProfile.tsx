import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiShield, FiLock, FiLogOut } from 'react-icons/fi';

export const UserProfile: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold">User Profile</h2>
        <p className="text-gray-500">Manage your personal information and security</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-6 rounded-2xl flex flex-col items-center text-center col-span-1"
        >
          <div className="w-24 h-24 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 overflow-hidden mb-4 border-4 border-white dark:border-slate-800 shadow-lg">
            {user?.avatar ? (
              <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <FiUser className="w-10 h-10" />
            )}
          </div>
          <h3 className="text-xl font-bold mb-1">{user?.name || 'User'}</h3>
          <p className="text-gray-500 capitalize mb-6 flex items-center gap-2 justify-center">
            <FiShield className="text-primary-500" /> {user?.role || 'Admin'}
          </p>
          
          <button 
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-600 rounded-xl font-medium transition-colors mt-auto"
          >
            <FiLogOut /> Logout
          </button>
        </motion.div>

        {/* Details & Settings */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-6 rounded-2xl col-span-1 md:col-span-2 space-y-8"
        >
          <div>
            <h3 className="text-lg font-bold border-b border-gray-100 dark:border-gray-800 pb-4 mb-4 flex items-center gap-2">
              <FiUser /> Personal Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-500">Full Name</label>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700">
                  <FiUser className="text-gray-400" />
                  <span className="font-medium">{user?.name}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-500">Email Address</label>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700">
                  <FiMail className="text-gray-400" />
                  <span className="font-medium">{user?.email}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold border-b border-gray-100 dark:border-gray-800 pb-4 mb-4 flex items-center gap-2">
              <FiLock /> Security
            </h3>
            <button className="px-6 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
              Change Password
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
