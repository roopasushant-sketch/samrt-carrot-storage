import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';

export const LoginPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: 'admin@demo.com',
      password: 'admin123'
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      if (data.email === 'admin@demo.com' && data.password === 'admin123') {
        login('fake-jwt-token', { id: '1', name: 'Admin User', email: data.email, role: 'admin' });
        navigate('/dashboard');
      } else {
        setError('Invalid email or password. Use admin@demo.com / admin123');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-8 rounded-2xl w-full"
    >
      <div className="text-center mb-8">
        <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
          SC
        </div>
        <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
        <p className="text-gray-500 dark:text-gray-400">Sign in to your Smart Carrot dashboard</p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-start gap-3 text-red-600 dark:text-red-400 text-sm">
          <FiAlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-2">Email Address</label>
          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              {...register('email', { required: 'Email is required' })}
              type="email" 
              placeholder="admin@demo.com"
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-slate-900/50 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email.message as string}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              {...register('password', { required: 'Password is required' })}
              type="password" 
              placeholder="••••••••"
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-slate-900/50 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          {errors.password && <span className="text-red-500 text-xs mt-1 block">{errors.password.message as string}</span>}
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded border-gray-300 text-primary-500 focus:ring-primary-500" />
            <span>Remember me</span>
          </label>
          <Link to="/forgot-password" className="text-primary-600 hover:text-primary-700 font-medium">Forgot Password?</Link>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full py-3 rounded-xl font-bold bg-primary-500 text-white hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading && <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
          Sign In
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        Don't have an account? <Link to="/register" className="text-primary-600 font-bold hover:underline">Sign up</Link>
      </p>
    </motion.div>
  );
};
