import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Droplets,
  Bell,
  User,
  LogOut,
  Settings,
  Heart,
  ChevronDown,
} from 'lucide-react';
import { cn } from '../../utils/helpers';
import { useAuth } from '../../hooks';
import { useNotificationStore } from '../../store';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';

// ============================================
// Navbar Component
// ============================================

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotificationStore();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isProfileOpen || isNotifOpen) {
        setIsProfileOpen(false);
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isProfileOpen, isNotifOpen]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/requests', label: 'Find Requests' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const authLinks = isAuthenticated
    ? [
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/requests', label: 'Requests' },
        ...(user?.role === 'donor'
          ? [{ path: '/profile/donor-card', label: 'Donor Card' }]
          : []),
        ...(user?.role === 'recipient' || user?.role === 'hospital'
          ? [{ path: '/requests/new', label: 'New Request' }]
          : []),
      ]
    : [];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-gray-200/50'
          : 'bg-transparent'
      )}
    >
      <nav className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 15 }}
              className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-lg shadow-red-500/25"
            >
              <Droplets className="w-6 h-6 text-white" />
            </motion.div>
            <span className={cn(
              'text-xl font-bold transition-colors',
              isScrolled ? 'text-gray-900' : 'text-white'
            )}>
              Life<span className="text-primary">Blood</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {(isAuthenticated ? authLinks : navLinks).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  location.pathname === link.path
                    ? 'text-primary bg-red-50'
                    : isScrolled
                      ? 'text-gray-600 hover:text-primary hover:bg-gray-50'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsNotifOpen(!isNotifOpen);
                      setIsProfileOpen(false);
                    }}
                    className={cn(
                      'p-2 rounded-lg transition-colors relative',
                      isScrolled
                        ? 'hover:bg-gray-100 text-gray-600'
                        : 'hover:bg-white/10 text-white'
                    )}
                    aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}`}
                  >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </button>

                  {/* Notification Dropdown */}
                  <AnimatePresence>
                    {isNotifOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900">Notifications</h3>
                          {unreadCount > 0 && (
                            <button
                              onClick={markAllAsRead}
                              className="text-xs text-primary hover:text-primary-dark font-medium"
                            >
                              Mark all read
                            </button>
                          )}
                        </div>
                        
                        <div className="max-h-80 overflow-y-auto">
                          {notifications.length === 0 ? (
                            <div className="p-8 text-center text-gray-500 text-sm">
                              No notifications yet
                            </div>
                          ) : (
                            notifications.slice(0, 5).map((notif) => (
                              <button
                                key={notif.id}
                                onClick={() => markAsRead(notif.id)}
                                className={cn(
                                  'w-full p-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0',
                                  !notif.isRead && 'bg-red-50/50'
                                )}
                              >
                                <div className="flex items-start gap-3">
                                  <div
                                    className={cn(
                                      'w-2 h-2 rounded-full mt-2 flex-shrink-0',
                                      notif.isRead ? 'bg-gray-300' : 'bg-primary'
                                    )}
                                  />
                                  <div>
                                    <p className={cn(
                                      'text-sm font-medium',
                                      !notif.isRead ? 'text-gray-900' : 'text-gray-600'
                                    )}>
                                      {notif.title}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                      {notif.message}
                                    </p>
                                  </div>
                                </div>
                              </button>
                            ))
                          )}
                        </div>

                        <div className="p-3 border-t border-gray-100 bg-gray-50">
                          <Link
                            to="/notifications"
                            onClick={() => setIsNotifOpen(false)}
                            className="block text-center text-sm font-medium text-primary hover:text-primary-dark"
                          >
                            View all notifications
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsProfileOpen(!isProfileOpen);
                      setIsNotifOpen(false);
                    }}
                    className="flex items-center gap-2 p-1.5 pr-3 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Avatar src={user?.avatar} alt={user?.name || 'User'} size="sm" />
                    <span className="hidden md:block text-sm font-medium text-gray-700 max-w-[120px] truncate">
                      {user?.name?.split(' ')[0]}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>

                  {/* Profile Dropdown Menu */}
                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="p-4 bg-gradient-to-br from-primary to-primary-dark">
                          <div className="flex items-center gap-3">
                            <Avatar
                              src={user?.avatar}
                              alt={user?.name || 'User'}
                              size="md"
                            />
                            <div>
                              <p className="font-semibold text-white">{user?.name}</p>
                              <p className="text-sm text-white/80 capitalize">{user?.role}</p>
                            </div>
                          </div>
                        </div>

                        <div className="p-2">
                          <Link
                            to="/profile"
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <User className="w-4 h-4" />
                            <span className="text-sm">My Profile</span>
                          </Link>
                          
                          <Link
                            to="/settings"
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <Settings className="w-4 h-4" />
                            <span className="text-sm">Settings</span>
                          </Link>

                          {user?.role === 'donor' && (
                            <Link
                              to="/donations/history"
                              onClick={() => setIsProfileOpen(false)}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              <Heart className="w-4 h-4" />
                              <span className="text-sm">Donation History</span>
                            </Link>
                          )}

                          <hr className="my-2 border-gray-100" />

                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            <span className="text-sm">Sign Out</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="hidden sm:flex items-center gap-3">
                <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                  Sign In
                </Button>
                <Button size="sm" onClick={() => navigate('/register')}>
                  Get Started
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                'lg:hidden p-2 rounded-lg transition-colors',
                isScrolled
                  ? 'hover:bg-gray-100 text-gray-600'
                  : 'hover:bg-white/10 text-white'
              )}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-1 border-t border-gray-100">
                {(isAuthenticated ? authLinks : navLinks).map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      'block px-4 py-3 rounded-lg text-base font-medium transition-colors',
                      location.pathname === link.path
                        ? 'text-primary bg-red-50'
                        : isScrolled
                          ? 'text-gray-600 hover:text-primary hover:bg-gray-50'
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                
                {!isAuthenticated && (
                  <div className="pt-4 space-y-3 px-4">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        navigate('/login');
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Sign In
                    </Button>
                    <Button
                      className="w-full"
                      onClick={() => {
                        navigate('/register');
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Get Started
                    </Button>
                  </div>
                )}

                {isAuthenticated && (
                  <div className="pt-4 border-t border-gray-100 px-4">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-red-600 font-medium py-2"
                    >
                      <LogOut className="w-5 h-5" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};
