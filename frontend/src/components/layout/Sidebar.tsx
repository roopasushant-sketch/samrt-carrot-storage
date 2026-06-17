import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FiHome, 
  FiActivity, 
  FiClock, 
  FiAlertTriangle, 
  FiCpu, 
  FiSliders, 
  FiFileText, 
  FiSettings,
  FiLogOut
} from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: FiHome },
  { path: '/live', label: 'Live Monitoring', icon: FiActivity },
  { path: '/history', label: 'Sensor History', icon: FiClock },
  { path: '/alerts', label: 'Active Alerts', icon: FiAlertTriangle },
  { path: '/devices', label: 'Device Status', icon: FiCpu },
  { path: '/simulation', label: 'Simulation', icon: FiSliders },
  { path: '/reports', label: 'Reports', icon: FiFileText },
  { path: '/settings', label: 'Settings', icon: FiSettings },
];

export const Sidebar: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div className="w-64 h-screen glass-panel flex flex-col justify-between fixed left-0 top-0 z-20">
      <div>
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold">
            SC
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">
            Smart Carrot
          </h1>
        </div>
        
        <nav className="mt-6 px-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30' 
                    : 'hover:bg-primary-50 dark:hover:bg-slate-800/50 text-gray-600 dark:text-gray-300'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-glass-border">
        <button 
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
        >
          <FiLogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};
