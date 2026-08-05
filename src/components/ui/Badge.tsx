import React from 'react';
import { cn } from '../../utils/helpers';
import type { BloodGroup, UrgencyLevel, RequestStatus } from '../../types';

// ============================================
// Badge Component
// ============================================

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
}

const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  size = 'md',
  dot = false,
  children,
  ...props
}) => {
  const variants = {
    default: 'bg-gray-100 text-gray-700',
    primary: 'bg-red-100 text-red-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    danger: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700',
    outline: 'border border-gray-200 bg-transparent text-gray-600',
  };

  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5',
  };

  const dotColors = {
    default: 'bg-gray-500',
    primary: 'bg-red-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500',
    info: 'bg-blue-500',
    outline: 'bg-gray-400',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-semibold rounded-full',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn('w-1.5 h-1.5 rounded-full mr-1.5', dotColors[variant])}
        />
      )}
      {children}
    </span>
  );
};

// ============================================
// Blood Group Badge (Special)
// ============================================

interface BloodGroupBadgeProps {
  bloodGroup: BloodGroup;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const bloodGroupColors: Record<BloodGroup, string> = {
  'A+': 'bg-red-500 text-white',
  'A-': 'bg-red-400 text-white',
  'B+': 'bg-blue-500 text-white',
  'B-': 'bg-blue-400 text-white',
  'AB+': 'bg-purple-500 text-white',
  'AB-': 'bg-purple-400 text-white',
  'O+': 'bg-green-500 text-white',
  'O-': 'bg-emerald-400 text-white',
};

export const BloodGroupBadge: React.FC<BloodGroupBadgeProps> = ({
  bloodGroup,
  size = 'md',
  showLabel = true,
}) => {
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm font-bold',
    lg: 'px-4 py-1.5 text-lg font-bold',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-xl font-bold shadow-sm',
        bloodGroupColors[bloodGroup],
        sizes[size]
      )}
      role="badge"
      aria-label={`Blood group ${bloodGroup}`}
    >
      {showLabel ? bloodGroup : bloodGroup[0]}
    </span>
  );
};

// ============================================
// Urgency Badge (Special)
// ============================================

interface UrgencyBadgeProps {
  urgency: UrgencyLevel;
  showIcon?: boolean;
}

const urgencyConfig: Record<UrgencyLevel, { color: string; icon: string; label: string }> = {
  critical: { color: 'bg-red-100 text-red-700 border border-red-200', icon: '🚨', label: 'Critical' },
  high: { color: 'bg-orange-100 text-orange-700 border border-orange-200', icon: '⚠️', label: 'High' },
  medium: { color: 'bg-yellow-100 text-yellow-700 border border-yellow-200', icon: '📋', label: 'Medium' },
  low: { color: 'bg-green-100 text-green-700 border border-green-200', icon: '✅', label: 'Low' },
};

export const UrgencyBadge: React.FC<UrgencyBadgeProps> = ({ urgency, showIcon = true }) => {
  const config = urgencyConfig[urgency];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold',
        config.color
      )}
      role="badge"
      aria-label={`Urgency: ${config.label}`}
    >
      {showIcon && <span>{config.icon}</span>}
      {config.label}
    </span>
  );
};

// ============================================
// Status Badge (Special)
// ============================================

interface StatusBadgeProps {
  status: RequestStatus;
}

const statusConfig: Record<RequestStatus, { color: string; label: string }> = {
  pending: { color: 'bg-gray-100 text-gray-700', label: 'Pending' },
  active: { color: 'bg-blue-100 text-blue-700', label: 'Active' },
  fulfilled: { color: 'bg-green-100 text-green-700', label: 'Fulfilled' },
  cancelled: { color: 'bg-red-100 text-red-700', label: 'Cancelled' },
  expired: { color: 'bg-stone-100 text-stone-700', label: 'Expired' },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium',
        config.color
      )}
      role="status"
      aria-label={`Status: ${config.label}`}
    >
      {config.label}
    </span>
  );
};

export { Badge };
