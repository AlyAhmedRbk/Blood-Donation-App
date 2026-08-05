import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { cn } from '../../utils/helpers';

// Import images
import authIllustration from '../../assets/images/auth-illustration.png';

// ============================================
// Page Transition Variants
// ============================================

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -20,
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.3,
};

// ============================================
// Main Layout Component
// ============================================

interface MainLayoutProps {
  hideFooter?: boolean;
  hideNavbar?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  hideFooter = false,
  hideNavbar = false,
  className,
  children,
}) => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const isAuthPage = ['/login', '/register', '/forgot-password', '/reset-password'].includes(
    location.pathname
  );

  return (
    <div className={cn('min-h-screen flex flex-col bg-white', className)}>
      {/* Navbar */}
      {!isAuthPage && <Navbar />}

      {/* Main Content */}
      <main
        className={cn(
          'flex-1',
          isLandingPage ? '' : 'pt-18',
          isAuthPage ? 'min-h-screen' : ''
        )}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition as any}
            className="min-h-full"
          >
            {children || <Outlet />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      {!hideFooter && !isAuthPage && <Footer />}
    </div>
  );
};

// ============================================
// Auth Layout (for login/register pages)
// ============================================

export const AuthLayout: React.FC = () => (
  <div className="min-h-screen flex">
    {/* Left Side - Branding */}
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary-dark to-red-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20 text-white">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl xl:text-5xl font-bold mb-6 leading-tight">
            Save Lives with Every{' '}
            <span className="text-yellow-300">Donation</span>
          </h1>
          <p className="text-lg text-white/80 mb-8 max-w-md leading-relaxed">
            Join thousands of heroes who donate blood regularly. Your single donation can save up to three lives.
          </p>

          {/* Stats */}
          <div className="space-y-4">
            {[
              { value: '50K+', label: 'Active Donors' },
              { value: '150K+', label: 'Lives Saved' },
              { value: '500+', label: 'Partner Hospitals' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <span className="text-xl font-bold">{stat.value}</span>
                </div>
                <span className="text-white/70">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Illustration Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10"
        >
          <img
            src={authIllustration}
            alt="Blood Donation App"
            className="w-full max-w-sm mx-auto rounded-2xl shadow-2xl"
          />
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-20 right-20 w-32 h-32 bg-white/10 rounded-full backdrop-blur-sm"
        />
        <motion.div
          animate={{
            y: [0, 15, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute top-40 right-40 w-20 h-20 bg-white/5 rounded-full"
        />
      </div>
    </div>

    {/* Right Side - Form */}
    <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 md:p-12 bg-gray-50">
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </div>
  </div>
);

// ============================================
// Dashboard Layout (with sidebar)
// ============================================

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = () => {
  // This will be used for dashboard pages with sidebar
  // For now, we'll keep it simple and extend later
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-18">
        <Outlet />
      </main>
    </div>
  );
};
