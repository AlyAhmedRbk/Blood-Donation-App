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
  Search,
  Phone,
  Shield,
  Home,
  FileText,
  HelpCircle,
  Info,
  Mail,
} from 'lucide-react';
import { cn } from '../../utils/helpers';
import { useAuth } from '../../hooks';
import { useNotificationStore } from '../../store';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';

// ============================================
// Navbar Component - Deep Crimson Professional Design
// ============================================

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotificationStore();

  // Handle scroll effect for subtle depth change
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
    setIsNotifOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isProfileOpen || isNotifOpen) {
        const target = e.target as HTMLElement;
        if (!target.closest('.dropdown-menu')) {
          setIsProfileOpen(false);
          setIsNotifOpen(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileOpen, isNotifOpen]);

  // Navigation items
  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/about', label: 'About', icon: Info },
    { path: '/contact', label: 'Contact', icon: Mail },
    { path: '/requests', label: 'Find Blood', icon: Heart, protected: true },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/requests?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-gradient-to-r from-red-700 via-red-600 to-red-700 shadow-xl shadow-red-900/30' 
          : 'bg-gradient-to-r from-red-700 via-red-600 to-red-700 shadow-lg shadow-red-900/20'
      )}
    >
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          
          {/* ===== Logo ===== */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-black/20"
            >
              <Droplets className="w-6 h-6 text-red-600" />
            </motion.div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-white tracking-tight">
                Life<span className="text-red-200">Blood</span>
              </span>
              <span className="block text-[10px] text-red-200 font-medium -mt-1 tracking-wider uppercase">
                Save Lives Today
              </span>
            </div>
          </Link>

          {/* ===== Desktop Navigation Links ===== */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              
              if (link.protected && !isAuthenticated) return null;
              
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'relative px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-all duration-200',
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'text-red-100 hover:text-white hover:bg-white/10'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-white rounded-full"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* ===== Right Side Actions ===== */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={cn(
                'w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200',
                isSearchOpen ? 'bg-white/20 text-white' : 'text-red-100 hover:text-white hover:bg-white/10'
              )}
            >
              <Search className="w-4 h-4" />
            </button>

            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <div className="relative dropdown-menu">
                  <button
                    onClick={() => {
                      setIsNotifOpen(!isNotifOpen);
                      setIsProfileOpen(false);
                    }}
                    className={cn(
                      'relative w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200',
                      isNotifOpen ? 'bg-white/20 text-white' : 'text-red-100 hover:text-white hover:bg-white/10'
                    )}
                  >
                    <Bell className="w-4 h-4" />
                    {unreadCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 text-red-900 text-[10px] font-bold rounded-full flex items-center justify-center"
                      >
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </motion.span>
                    )}
                  </button>

                  <AnimatePresence>
                    {isNotifOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden dropdown-menu"
                      >
                        <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 border-b border-gray-100">
                          <div className="flex items-center justify-between">
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
                        </div>
                        
                        <div className="max-h-80 overflow-y-auto">
                          {notifications.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">
                              <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                              <p className="font-medium">No notifications yet</p>
                            </div>
                          ) : (
                            notifications.slice(0, 5).map((notif) => (
                              <motion.div
                                key={notif.id}
                                whileHover={{ backgroundColor: '#fef2f2' }}
                                className={cn(
                                  'p-4 border-b border-gray-50 cursor-pointer',
                                  !notif.isRead && 'bg-red-50/50'
                                )}
                                onClick={() => markAsRead(notif.id)}
                              >
                                <p className="text-sm text-gray-800 font-medium">{notif.title}</p>
                                <p className="text-xs text-gray-500 mt-1">{notif.message}</p>
                              </motion.div>
                            ))
                          )}
                        </div>

                        <div className="p-3 bg-gray-50 border-t border-gray-100">
                          <Link
                            to="/notifications"
                            className="block text-center text-sm font-medium text-primary hover:text-primary-dark"
                            onClick={() => setIsNotifOpen(false)}
                          >
                            View all notifications
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Profile Dropdown */}
                <div className="relative dropdown-menu">
                  <button
                    onClick={() => {
                      setIsProfileOpen(!isProfileOpen);
                      setIsNotifOpen(false);
                    }}
                    className={cn(
                      'flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl transition-all duration-200',
                      isProfileOpen ? 'bg-white/20' : 'hover:bg-white/10'
                    )}
                  >
                    <Avatar
                      src={user?.avatar}
                      alt={user?.name || 'User'}
                      size="sm"
                      className="ring-2 ring-white/30"
                    />
                    <span className="hidden md:block text-sm font-medium text-white max-w-[100px] truncate">
                      {user?.name?.split(' ')[0]}
                    </span>
                    <ChevronDown className={cn(
                      'w-3.5 h-3.5 text-red-200 transition-transform duration-200',
                      isProfileOpen && 'rotate-180'
                    )} />
                  </button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden dropdown-menu"
                      >
                        {/* User Info Header */}
                        <div className="p-4 bg-gradient-to-r from-red-600 to-red-700">
                          <div className="flex items-center gap-3">
                            <Avatar
                              src={user?.avatar}
                              alt={user?.name || 'User'}
                              size="lg"
                              className="ring-2 ring-white/30"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-white truncate">{user?.name}</p>
                              <p className="text-xs text-red-200 capitalize">{user?.role}</p>
                            </div>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="p-2">
                          <Link
                            to="/profile"
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-700 hover:bg-red-50 hover:text-primary transition-colors"
                          >
                            <User className="w-4 h-4" />
                            <span className="text-sm font-medium">My Profile</span>
                          </Link>
                          
                          <Link
                            to="/settings"
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-700 hover:bg-red-50 hover:text-primary transition-colors"
                          >
                            <Settings className="w-4 h-4" />
                            <span className="text-sm font-medium">Settings</span>
                          </Link>

                          {(user?.role === 'donor') && (
                            <Link
                              to="/profile/donor-card"
                              onClick={() => setIsProfileOpen(false)}
                              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-700 hover:bg-red-50 hover:text-primary transition-colors"
                            >
                              <FileText className="w-4 h-4" />
                              <span className="text-sm font-medium">Donor Card</span>
                            </Link>
                          )}

                          <Link
                            to="/dashboard"
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-700 hover:bg-red-50 hover:text-primary transition-colors"
                          >
                            <Home className="w-4 h-4" />
                            <span className="text-sm font-medium">Dashboard</span>
                          </Link>
                        </div>

                        <div className="border-t border-gray-100 p-2">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            <span className="text-sm font-medium">Sign Out</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              /* Auth Buttons (Logged Out) */
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/login')}
                  className="!text-white hover:!bg-white/20 hidden sm:inline-flex"
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  onClick={() => navigate('/register')}
                  className="bg-white !text-red-600 hover:bg-red-50 shadow-lg shadow-black/20 font-bold"
                >
                  Get Started
                </Button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ===== Search Bar Overlay ===== */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-white/10 bg-red-800/90 backdrop-blur-sm"
          >
            <form onSubmit={handleSearch} className="container-custom mx-auto px-4 py-4">
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-300" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search blood requests, donors, hospitals..."
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-red-300 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-white text-red-600 rounded-lg text-sm font-semibold hover:bg-red-50 transition-colors"
                >
                  Search
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== Mobile Menu ===== */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-gradient-to-b from-red-700 to-red-800 z-50 shadow-2xl lg:hidden overflow-y-auto"
            >
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                    <Droplets className="w-6 h-6 text-red-600" />
                  </div>
                  <span className="text-xl font-bold text-white">LifeBlood</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Nav Links */}
              <div className="p-4 space-y-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = location.pathname === link.path;
                  
                  if (link.protected && !isAuthenticated) return null;
                  
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200',
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'text-red-100 hover:text-white hover:bg-white/10'
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              {/* Divider */}
              {!isAuthenticated && (
                <div className="mx-4 my-4 border-t border-white/10" />
              )}

              {/* Auth Section or User Section */}
              <div className="p-4">
                {isAuthenticated && user ? (
                  <div className="space-y-4">
                    {/* User Card */}
                    <div className="bg-white/10 rounded-2xl p-4">
                      <div className="flex items-center gap-3 mb-4">
                        <Avatar src={user.avatar} alt={user.name} size="md" />
                        <div>
                          <p className="font-semibold text-white">{user.name}</p>
                          <p className="text-xs text-red-200 capitalize">{user.role}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <Link
                          to="/profile"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-100 hover:text-white hover:bg-white/10 text-sm"
                        >
                          <User className="w-4 h-4" /> Profile
                        </Link>
                        <Link
                          to="/dashboard"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-100 hover:text-white hover:bg-white/10 text-sm"
                        >
                          <Home className="w-4 h-4" /> Dashboard
                        </Link>
                        <Link
                          to="/settings"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-100 hover:text-white hover:bg-white/10 text-sm"
                        >
                          <Settings className="w-4 h-4" /> Settings
                        </Link>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-medium transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Button
                      variant="secondary"
                      className="w-full !border-white/30 !text-white hover:!bg-white/20"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigate('/login');
                      }}
                    >
                      Sign In
                    </Button>
                    <Button
                      className="w-full bg-white !text-red-600 hover:bg-red-50 shadow-lg"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigate('/register');
                      }}
                    >
                      Get Started Free
                    </Button>
                    
                    {/* Emergency Contact */}
                    <div className="mt-6 bg-white/10 rounded-xl p-4">
                      <div className="flex items-center gap-3 text-white/90">
                        <Phone className="w-5 h-5 text-yellow-400" />
                        <div>
                          <p className="text-xs text-red-200">Emergency Hotline</p>
                          <p className="font-bold">1-800-LIFEBLOOD</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};
