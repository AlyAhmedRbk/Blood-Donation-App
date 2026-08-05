import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';
import { Loader2 } from 'lucide-react';

// ============================================
// Spinner Component
// ============================================

interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'white' | 'gray';
  className?: string;
  label?: string;
}

const sizes = {
  xs: 'w-4 h-4',
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
};

const colors = {
  primary: 'text-primary',
  white: 'text-white',
  gray: 'text-gray-400',
};

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = 'primary',
  className,
  label = 'Loading...',
}) => (
  <div role="status" aria-label={label} className={cn('inline-flex items-center justify-center', className)}>
    <Loader2 className={cn('animate-spin', sizes[size], colors[color])} />
    <span className="sr-only">{label}</span>
  </div>
);

// ============================================
// Page Loader (Full page loading)
// ============================================

interface PageLoaderProps {
  message?: string;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ message = 'Loading...' }) => (
  <div className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-50">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex flex-col items-center gap-4"
    >
      <div className="relative">
        <Spinner size="xl" />
        <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent opacity-20" />
      </div>
      <p className="text-gray-600 font-medium animate-pulse">{message}</p>
    </motion.div>
  </div>
);

// ============================================
// Inline Loading (for buttons, cards)
// ============================================

interface InlineLoaderProps {
  text?: string;
  size?: 'sm' | 'md';
}

export const InlineLoader: React.FC<InlineLoaderProps> = ({
  text = 'Please wait...',
  size = 'sm',
}) => (
  <div className="inline-flex items-center gap-2">
    <Spinner size={size === 'sm' ? 'xs' : 'sm'} />
    <span className="text-sm text-gray-600">{text}</span>
  </div>
);

// ============================================
// Dots Loading Animation
// ============================================

interface DotsLoaderProps {
  color?: string;
}

export const DotsLoader: React.FC<DotsLoaderProps> = ({ color = '#dc2626' }) => (
  <div className="flex items-center gap-1" role="status" aria-label="Loading">
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: color }}
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          delay: i * 0.15,
          ease: 'easeInOut',
        }}
      />
    ))}
  </div>
);
