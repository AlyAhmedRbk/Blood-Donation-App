import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Droplets,
  Mail,
  Phone,
  MapPin,
  Heart,
  ArrowRight,
} from 'lucide-react';
import { cn } from '../../utils/helpers';

// ============================================
// Footer Component
// ============================================

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { label: 'Find Blood', path: '/requests' },
      { label: 'Donate Blood', path: '/register?role=donor' },
      { label: 'Request Blood', path: '/requests/new' },
      { label: 'Blood Banks', path: '/map' },
      { label: 'Eligibility Checker', path: '/eligibility' },
    ],
    company: [
      { label: 'About Us', path: '/about' },
      { label: 'Our Team', path: '/about#team' },
      { label: 'Careers', path: '/careers' },
      { label: 'Press Kit', path: '/press' },
      { label: 'Contact Us', path: '/contact' },
    ],
    resources: [
      { label: 'Blog', path: '/blog' },
      { label: 'FAQs', path: '/#faq' },
      { label: 'Success Stories', path: '/stories' },
      { label: 'Research & Data', path: '/research' },
      { label: 'Partner With Us', path: '/partners' },
    ],
    legal: [
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms of Service', path: '/terms' },
      { label: 'Cookie Policy', path: '/cookies' },
      { label: 'GDPR Compliance', path: '/gdpr' },
      { label: 'Accessibility', path: '/accessibility' },
    ],
  };

  const socialLinks = [
    { 
      icon: () => (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ), 
      href: '#', 
      label: 'Facebook', 
      color: 'hover:bg-blue-600' 
    },
    { 
      icon: () => (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ), 
      href: '#', 
      label: 'Twitter', 
      color: 'hover:bg-sky-500' 
    },
    { 
      icon: () => (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.053.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.36 2.62 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.359-.2 6.78-2.62 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      ), 
      href: '#', 
      label: 'Instagram', 
      color: 'hover:bg-pink-600' 
    },
    { 
      icon: () => (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ), 
      href: '#', 
      label: 'LinkedIn', 
      color: 'hover:bg-blue-700' 
    },
    { 
      icon: () => (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ), 
      href: '#', 
      label: 'YouTube', 
      color: 'hover:bg-red-600' 
    },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl font-bold mb-3">
                Save Lives with Every{' '}
                <span className="text-primary">Donation</span>
              </h3>
              <p className="text-gray-400">
                Join our community of life-savers. Get updates on blood drives,
                success stories, and how your donations make a difference.
              </p>
            </div>

            <motion.form
              whileHover={{ scale: 1.01 }}
              className="flex w-full lg:w-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className={cn(
                  'flex-1 lg:w-80 px-5 py-4 rounded-l-xl',
                  'bg-gray-800 border border-gray-700 text-white',
                  'placeholder:text-gray-500',
                  'focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary'
                )}
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className={cn(
                  'px-6 py-4 bg-primary hover:bg-primary-dark',
                  'rounded-r-xl font-semibold transition-colors',
                  'flex items-center gap-2 whitespace-nowrap'
                )}
              >
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <motion.div
                whileHover={{ rotate: 15 }}
                className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center"
              >
                <Droplets className="w-6 h-6 text-white" />
              </motion.div>
              <span className="text-xl font-bold">
                Life<span className="text-primary">Blood</span>
              </span>
            </Link>

            <p className="text-gray-400 mb-6 max-w-sm">
              Connecting life-saving blood donors with those in need. Every
              donation counts, every drop matters.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="mailto:support@lifeblood.com"
                className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>support@lifeblood.com</span>
              </a>
              <a
                href="tel:+1-800-lifeblood"
                className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>1-800-LIFEBLOOD</span>
              </a>
              <div className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>123 Health Street, Medical District, NY 10001</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className={cn(
                    'w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center',
                    'text-gray-400 transition-all duration-200',
                    social.color + ' hover:text-white'
                  )}
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          <div>
            <h4 className="font-semibold text-white mb-4">Platform</h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © {currentYear} LifeBlood. All rights reserved. Made with{' '}
              <Heart className="w-4 h-4 inline text-primary fill-current" /> for saving lives.
            </p>

            <div className="flex items-center gap-6">
              <span className="text-xs text-gray-600">
                Certified by FDA & WHO Standards
              </span>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-900/50 rounded-lg flex items-center justify-center">
                  <span className="text-[10px] font-bold text-green-400">✓</span>
                </div>
                <div className="w-8 h-8 bg-blue-900/50 rounded-lg flex items-center justify-center">
                  <span className="text-[10px] font-bold text-blue-400">ISO</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
