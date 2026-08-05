import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuthStore, useRequestStore, useNotificationStore, useUIStore } from '../store';
import {
  checkEligibility,
  timeAgo,
  formatNumber,
  debounce,
} from '../utils/helpers';
import type { DonorProfile, BloodRequest, SearchFilters } from '../types';

// ============================================
// Auth Hook
// ============================================

export function useAuth() {
  const {
    user,
    donorProfile,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    updateProfile,
    updateDonorProfile,
    clearError,
  } = useAuthStore();

  const isDonor = user?.role === 'donor';
  const isRecipient = user?.role === 'recipient';
  const isHospital = user?.role === 'hospital';
  const isAdmin = user?.role === 'admin';

  return {
    user,
    donorProfile,
    isAuthenticated,
    isLoading,
    error,
    isDonor,
    isRecipient,
    isHospital,
    isAdmin,
    login,
    register,
    logout,
    updateProfile,
    updateDonorProfile,
    clearError,
  };
}

// ============================================
// Donor Hook
// ============================================

export function useDonor() {
  const { donorProfile, updateDonorProfile } = useAuthStore();

  const eligibility = useMemo(() => {
    if (!donorProfile) return null;
    return checkEligibility(donorProfile.lastDonationDate);
  }, [donorProfile?.lastDonationDate]);

  const canDonate = eligibility?.isEligible ?? false;

  const daysUntilEligible = eligibility?.daysUntilEligible ?? 0;

  const updateAvailability = useCallback(
    (isAvailable: boolean) => {
      updateDonorProfile({ isAvailable });
    },
    [updateDonorProfile]
  );

  return {
    donor: donorProfile,
    eligibility,
    canDonate,
    daysUntilEligible,
    updateAvailability,
    totalDonations: donorProfile?.totalDonations ?? 0,
    bloodGroup: donorProfile?.bloodGroup,
  };
}

// ============================================
// Requests Hook
// ============================================

export function useRequests() {
  const store = useRequestStore();

  const activeRequests = useMemo(
    () => store.requests.filter((r) => r.status === 'active'),
    [store.requests]
  );

  const urgentRequests = useMemo(
    () =>
      store.requests.filter(
        (r) => r.status === 'active' && (r.urgency === 'critical' || r.urgency === 'high')
      ),
    [store.requests]
  );

  const requestsByBloodGroup = useMemo(
    () =>
      store.requests.reduce((acc, request) => {
        acc[request.bloodGroup] = (acc[request.bloodGroup] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
    [store.requests]
  );

  const searchRequests = useCallback(
    debounce((filters: SearchFilters) => {
      store.setFilters(filters);
    }, 300),
    [store.setFilters]
  );

  return {
    ...store,
    activeRequests,
    urgentRequests,
    requestsByBloodGroup,
    searchRequests,
  };
}

// ============================================
// Notifications Hook
// ============================================

export function useNotifications() {
  const store = useNotificationStore();

  const unreadNotifications = useMemo(
    () => store.notifications.filter((n) => !n.isRead),
    [store.notifications]
  );

  const recentNotifications = useMemo(
    () => store.notifications.slice(0, 5),
    [store.notifications]
  );

  return {
    ...store,
    unreadNotifications,
    recentNotifications,
  };
}

// ============================================
// UI Hook
// ============================================

export function useUI() {
  return useUIStore();
}

// ============================================
// Stats Hook (Animated counters)
// ============================================

export function useAnimatedNumber(target: number, duration: number = 2000) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCurrent(Math.floor(easeOutQuart * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration]);

  return current;
}

// ============================================
// Local Storage Hook
// ============================================

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return [storedValue, setValue] as const;
}

// ============================================
// Media Query Hook
// ============================================

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
    
    // Set initial value
    setMatches(mediaQuery.matches);

    // Listen for changes
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

// ============================================
// Format Hook
// ============================================

export function useFormat() {
  return {
    timeAgo: (date: string) => timeAgo(date),
    formatNumber: (num: number) => formatNumber(num),
  };
}
