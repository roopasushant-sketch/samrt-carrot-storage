import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiArrowLeft, FiCheckCircle, FiKey, FiLock, FiAlertCircle } from 'react-icons/fi';

type Step = 'email' | 'otp' | 'reset' | 'success';

export const ForgotPasswordPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [step, setStep] = useState<Step>('email');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const newPassword = watch('newPassword');

  const onEmailSubmit = () => {
    setIsLoading(true);
    setErrorMsg('');
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
    }, 1000);
  };

  const onOtpSubmit = (data: any) => {
    setIsLoading(true);
    setErrorMsg('');
    setTimeout(() => {
      setIsLoading(false);
      // Simulate verifying OTP. Use '123456' as the mock correct OTP.
      if (data.otp === '123456') {
        setStep('reset');
      } else {
        setErrorMsg('Invalid OTP. Please use 123456 for testing.');
      }
    }, 1000);
  };

  const onResetSubmit = () => {
    setIsLoading(true);
    setErrorMsg('');
    setTimeout(() => {
      setIsLoading(false);
      setStep('success');
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
        <h2 className="text-2xl font-bold mb-2">Reset Password</h2>
        <p className="text-gray-500 dark:text-gray-400">
          {step === 'email' && "Enter your email to receive a One-Time Password (OTP)"}
          {step === 'otp' && "Enter the 6-digit OTP sent to your email"}
          {step === 'reset' && "Create a new password for your account"}
          {step === 'success' && "Password reset successfully!"}
        </p>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-start gap-3 text-red-600 dark:text-red-400 text-sm">
          <FiAlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p>{errorMsg}</p>
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === 'email' && (
          <motion.form
            key="email"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
            onSubmit={handleSubmit(onEmailSubmit)} className="space-y-5"
          >
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  {...register('email', { required: 'Email is required' })}
                  type="email"
                  placeholder="john@example.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-slate-900/50 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                />
              </div>
              {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email.message as string}</span>}
            </div>

            <button type="submit" disabled={isLoading} className="w-full py-3 mt-4 rounded-xl font-bold bg-primary-500 text-white hover:bg-primary-600 transition-colors flex items-center justify-center gap-2">
              {isLoading && <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
              Send OTP
            </button>
            <BackToLogin />
          </motion.form>
        )}

        {step === 'otp' && (
          <motion.form
            key="otp"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
            onSubmit={handleSubmit(onOtpSubmit)} className="space-y-5"
          >
            <div>
              <label className="block text-sm font-medium mb-2">One-Time Password (OTP)</label>
              <div className="relative">
                <FiKey className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  {...register('otp', { required: 'OTP is required', minLength: { value: 6, message: 'OTP must be 6 digits' } })}
                  type="text"
                  maxLength={6}
                  placeholder="123456"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-slate-900/50 focus:ring-2 focus:ring-primary-500 outline-none transition-all tracking-widest text-lg font-mono"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">For this demo, please enter '123456'</p>
              {errors.otp && <span className="text-red-500 text-xs mt-1 block">{errors.otp.message as string}</span>}
            </div>

            <button type="submit" disabled={isLoading} className="w-full py-3 mt-4 rounded-xl font-bold bg-primary-500 text-white hover:bg-primary-600 transition-colors flex items-center justify-center gap-2">
              {isLoading && <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
              Verify OTP
            </button>
            <BackToLogin />
          </motion.form>
        )}

        {step === 'reset' && (
          <motion.form
            key="reset"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
            onSubmit={handleSubmit(onResetSubmit)} className="space-y-5"
          >
            <div>
              <label className="block text-sm font-medium mb-2">New Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  {...register('newPassword', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })}
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-slate-900/50 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                />
              </div>
              {errors.newPassword && <span className="text-red-500 text-xs mt-1 block">{errors.newPassword.message as string}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Confirm New Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  {...register('confirmNewPassword', {
                    required: 'Please confirm password',
                    validate: value => value === newPassword || 'Passwords do not match'
                  })}
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-slate-900/50 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                />
              </div>
              {errors.confirmNewPassword && <span className="text-red-500 text-xs mt-1 block">{errors.confirmNewPassword.message as string}</span>}
            </div>

            <button type="submit" disabled={isLoading} className="w-full py-3 mt-4 rounded-xl font-bold bg-primary-500 text-white hover:bg-primary-600 transition-colors flex items-center justify-center gap-2">
              {isLoading && <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
              Reset Password
            </button>
            <BackToLogin />
          </motion.form>
        )}

        {step === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-500 mx-auto mb-6">
              <FiCheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Password Reset Complete</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Your password has been successfully updated.
            </p>
            <Link to="/login" className="w-full py-3 rounded-xl font-bold bg-primary-500 text-white hover:bg-primary-600 transition-colors inline-block">
              Return to Login
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const BackToLogin = () => (
  <div className="mt-6 text-center">
    <Link to="/login" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors font-medium">
      <FiArrowLeft /> Back to Login
    </Link>
  </div>
);
