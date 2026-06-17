import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { FiSun, FiMoon, FiBell, FiUser } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

export const TopNavbar: React.FC = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname.split('/')[1];
    if (!path) return 'Dashboard';
    return path.charAt(0).toUpperCase() + path.slice(1).replace('-', ' ');
  };

  return (
    <header className="h-20 glass-panel fixed top-0 right-0 left-64 z-10 flex items-center justify-between px-8">
      <div>
        <h2 className="text-2xl font-bold">{getPageTitle()}</h2>
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          <Link to="/dashboard" className="hover:text-primary-500">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700 dark:text-gray-200">{getPageTitle()}</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <FiSun className="w-5 h-5 text-yellow-500" /> : <FiMoon className="w-5 h-5 text-slate-700" />}
        </button>

        <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
          <FiBell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <Link to="/profile" className="flex items-center gap-3 pl-4 border-l border-glass-border cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium group-hover:text-primary-500 transition-colors">{user?.name || 'Admin User'}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role || 'admin'}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 overflow-hidden border border-primary-200 dark:border-primary-800">
            {user?.avatar ? (
              <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <FiUser className="w-5 h-5" />
            )}
          </div>
        </Link>
      </div>
    </header>
  );
};
