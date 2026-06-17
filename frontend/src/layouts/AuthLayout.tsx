import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

export const AuthLayout: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { theme, toggleTheme } = useTheme();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-color">
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-bg-color flex flex-col transition-colors duration-300">
      <div className="absolute top-4 right-4 z-10">
        <button 
          onClick={toggleTheme}
          className="p-3 rounded-full glass-panel hover:bg-white/50 dark:hover:bg-black/50 transition-colors"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <FiSun className="w-6 h-6 text-yellow-500" /> : <FiMoon className="w-6 h-6 text-slate-700" />}
        </button>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
