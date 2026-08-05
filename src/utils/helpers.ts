import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { type VariantProps, cva } from 'class-variance-authority';
import { BloodGroup, UrgencyLevel, RequestStatus } from '../types';

// Export cva for use in components
export { cva };
export type { VariantProps };

// ============================================
// Utility Functions
// ============================================

/**
 * Merge Tailwind CSS classes with clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format date to readable string
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format date to relative time (e.g., "2 hours ago")
 */
export function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
}

/**
 * Format phone number
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{1,3})(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}`;
  }
  return phone;
}

/**
 * Get initials from name
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Generate unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), wait);
  };
}

/**
 * Check eligibility based on last donation date
 */
export function checkEligibility(lastDonationDate: string | null): {
  isEligible: boolean;
  daysUntilEligible: number;
  nextEligibleDate: string | null;
} {
  if (!lastDonationDate) {
    return {
      isEligible: true,
      daysUntilEligible: 0,
      nextEligibleDate: null,
    };
  }

  const lastDate = new Date(lastDonationDate);
  const eligibleDate = new Date(lastDate.getTime() + 56 * 24 * 60 * 60 * 1000); // 56 days
  const today = new Date();

  if (today >= eligibleDate) {
    return {
      isEligible: true,
      daysUntilEligible: 0,
      nextEligibleDate: null,
    };
  }

  const diffTime = eligibleDate.getTime() - today.getTime();
  const daysUntilEligible = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return {
    isEligible: false,
    daysUntilEligible,
    nextEligibleDate: eligibleDate.toISOString().split('T')[0],
  };
}

/**
 * Get blood group color
 */
export function getBloodGroupColor(bloodGroup: BloodGroup): string {
  const colors: Record<BloodGroup, string> = {
    'A+': '#ef4444',
    'A-': '#f87171',
    'B+': '#3b82f6',
    'B-': '#60a5fa',
    'AB+': '#8b5cf6',
    'AB-': '#a78bfa',
    'O+': '#10b981',
    'O-': '#34d399',
  };
  return colors[bloodGroup];
}

/**
 * Get urgency color and config
 */
export function getUrgencyConfig(urgency: UrgencyLevel) {
  const configs = {
    critical: {
      color: 'text-red-700 bg-red-100 border-red-200',
      textColor: 'text-red-600',
      dotColor: 'bg-red-500',
      label: 'Critical',
      icon: '🚨',
    },
    high: {
      color: 'text-orange-700 bg-orange-100 border-orange-200',
      textColor: 'text-orange-600',
      dotColor: 'bg-orange-500',
      label: 'High',
      icon: '⚠️',
    },
    medium: {
      color: 'text-yellow-700 bg-yellow-100 border-yellow-200',
      textColor: 'text-yellow-600',
      dotColor: 'bg-yellow-500',
      label: 'Medium',
      icon: '📋',
    },
    low: {
      color: 'text-green-700 bg-green-100 border-green-200',
      textColor: 'text-green-600',
      dotColor: 'bg-green-500',
      label: 'Low',
      icon: '✅',
    },
  };

  return configs[urgency];
}

/**
 * Get status color and config
 */
export function getStatusConfig(status: RequestStatus) {
  const configs = {
    pending: {
      color: 'text-gray-700 bg-gray-100 border-gray-200',
      textColor: 'text-gray-600',
      label: 'Pending',
    },
    active: {
      color: 'text-blue-700 bg-blue-100 border-blue-200',
      textColor: 'text-blue-600',
      label: 'Active',
    },
    fulfilled: {
      color: 'text-green-700 bg-green-100 border-green-200',
      textColor: 'text-green-600',
      label: 'Fulfilled',
    },
    cancelled: {
      color: 'text-red-700 bg-red-100 border-red-200',
      textColor: 'text-red-600',
      label: 'Cancelled',
    },
    expired: {
      color: 'text-stone-700 bg-stone-100 border-stone-200',
      textColor: 'text-stone-600',
      label: 'Expired',
    },
  };

  return configs[status];
}

/**
 * Calculate percentage
 */
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

/**
 * Format number with commas
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      return true;
    } catch {
      return false;
    } finally {
      document.body.removeChild(textarea);
    }
  }
}

/**
 * Scroll to element smoothly
 */
export function scrollToElement(elementId: string): void {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/**
 * Get greeting based on time of day
 */
export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}
