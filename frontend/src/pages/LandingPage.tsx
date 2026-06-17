import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiActivity, FiCloud, FiShield, FiSmartphone, FiCpu, FiThermometer } from 'react-icons/fi';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-bg-color">
      {/* Navbar */}
      <nav className="glass-panel fixed w-full z-50 top-0 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-xl">
            SC
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">
            Smart Carrot
          </span>
        </div>
        <div className="hidden md:flex gap-8 font-medium">
          <a href="#about" className="hover:text-primary-500 transition-colors">About</a>
          <a href="#features" className="hover:text-primary-500 transition-colors">Features</a>
          <a href="#architecture" className="hover:text-primary-500 transition-colors">Architecture</a>
          <a href="#contact" className="hover:text-primary-500 transition-colors">Contact</a>
        </div>
        <div className="flex gap-4">
          <Link to="/login" className="px-6 py-2 rounded-full font-medium hover:bg-primary-50 transition-colors dark:hover:bg-slate-800 border border-primary-200 dark:border-primary-800 text-primary-600 dark:text-primary-400">
            Log In
          </Link>
          <Link to="/register" className="px-6 py-2 rounded-full font-medium bg-primary-500 text-white hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/30">
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-semibold text-sm mb-6 inline-block">
            IoT Powered Cold Storage
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Next Generation <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-purple-500">
              Spoilage Prevention
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
            Real-time monitoring of Temperature, Humidity, and Ethylene gas to keep your carrots fresh and eliminate food waste.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/login" className="px-8 py-4 rounded-full font-bold bg-primary-500 text-white hover:bg-primary-600 transition-colors shadow-xl shadow-primary-500/30 flex items-center gap-2 text-lg">
              Go to Dashboard <FiArrowRight />
            </Link>
          </div>
        </motion.div>

        {/* Mockup Image */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 w-full max-w-5xl rounded-2xl glass-panel p-2 relative overflow-hidden aspect-video border-2 border-white/20"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 to-purple-500/20 mix-blend-overlay"></div>
          <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center text-white text-2xl font-light">
            [ Dashboard UI Preview Image ]
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Powerful Features</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">Everything you need to monitor and control your storage facility from anywhere in the world.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: FiThermometer, title: 'Real-time Sensors', desc: 'Track Temperature, Humidity, and Ethylene levels down to the second.' },
              { icon: FiCloud, title: 'Cloud Connectivity', desc: 'Access your storage data globally through our secure AWS infrastructure.' },
              { icon: FiActivity, title: 'Smart Alerts', desc: 'Instant notifications when thresholds are breached.' },
              { icon: FiCpu, title: 'Automated Control', desc: 'Automatically trigger fans and relays based on sensor inputs.' },
              { icon: FiShield, title: 'Secure Access', desc: 'Enterprise-grade JWT authentication and encrypted data transfer.' },
              { icon: FiSmartphone, title: 'Responsive UI', desc: 'Beautiful, intuitive interface that works flawlessly on all devices.' },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="glass-panel p-8 rounded-2xl hover:shadow-xl hover:shadow-primary-500/10 transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-primary-500 mb-6">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass-panel mt-20 py-12 px-8 border-t border-glass-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold">SC</div>
            <span className="text-xl font-bold text-gray-800 dark:text-white">Smart Carrot</span>
          </div>
          <p className="text-gray-500 dark:text-gray-400">© 2026 Smart Carrot Storage System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
