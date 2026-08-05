import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, DonorProfile, BloodRequest, Notification, Pledge } from '../types';
import { mockDonors, mockRequests, mockNotifications, demoAccounts } from '../data/mockData';

// ============================================
// Auth Store
// ============================================

interface AuthState {
  user: User | null;
  donorProfile: DonorProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Partial<User> & { password: string }) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  updateDonorProfile: (data: Partial<DonorProfile>) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      donorProfile: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });

        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Check demo accounts
          const demoKey = Object.keys(demoAccounts).find(
            (key) => demoAccounts[key as keyof typeof demoAccounts].email === email
          );

          if (demoKey && demoAccounts[demoKey as keyof typeof demoAccounts].password === password) {
            const account = demoAccounts[demoKey as keyof typeof demoAccounts];
            const user: User = {
              id: `user-${demoKey}`,
              email: account.email,
              name: account.name,
              role: account.role,
              phone: '+1-555-0100',
              createdAt: new Date().toISOString(),
              isActive: true,
            };

            const donorProfile = account.role === 'donor' ? {
              ...user,
              id: `donor-${demoKey}`,
              bloodGroup: 'O+' as const,
              age: 28,
              weight: 72,
              gender: 'male' as const,
              address: '123 Main Street',
              city: 'New York',
              state: 'NY',
              zipCode: '10001',
              isAvailable: true,
              lastDonationDate: '2024-10-15',
              totalDonations: 8,
              eligibilityDate: '2024-12-10',
              donations: [],
              pledges: [],
            } : null;

            set({
              user,
              donorProfile,
              isAuthenticated: true,
              isLoading: false,
            });
            return true;
          }

          // Check mock users
          const mockUser = mockDonors.find(
            (d) => d.email.toLowerCase() === email.toLowerCase()
          );

          if (mockUser) {
            set({
              user: mockUser,
              donorProfile: mockUser,
              isAuthenticated: true,
              isLoading: false,
            });
            return true;
          }

          set({
            error: 'Invalid email or password',
            isLoading: false,
          });
          return false;
        } catch {
          set({
            error: 'An error occurred during login',
            isLoading: false,
          });
          return false;
        }
      },

      register: async (userData) => {
        set({ isLoading: true, error: null });

        try {
          await new Promise((resolve) => setTimeout(resolve, 1500));

          const newUser: User = {
            id: `user-${Date.now()}`,
            email: userData.email || '',
            name: userData.name || '',
            role: userData.role || 'donor',
            phone: userData.phone || '',
            createdAt: new Date().toISOString(),
            isActive: true,
          };

          set({
            user: newUser,
            isAuthenticated: true,
            isLoading: false,
          });
          return true;
        } catch {
          set({
            error: 'Registration failed. Please try again.',
            isLoading: false,
          });
          return false;
        }
      },

      logout: () => {
        set({
          user: null,
          donorProfile: null,
          isAuthenticated: false,
          error: null,
        });
      },

      updateProfile: (data) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...data } });
        }
      },

      updateDonorProfile: (data) => {
        const currentProfile = get().donorProfile;
        if (currentProfile) {
          set({ donorProfile: { ...currentProfile, ...data } });
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'blood-donation-auth',
      partialize: (state) => ({
        user: state.user,
        donorProfile: state.donorProfile,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// ============================================
// Request Store
// ============================================

interface RequestState {
  requests: BloodRequest[];
  currentRequest: BloodRequest | null;
  filters: {
    bloodGroup?: string;
    city?: string;
    urgency?: string;
    status?: string;
    search?: string;
  };
  isLoading: boolean;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };

  // Computed/derived
  total: number;
  totalPages: number;

  // Actions
  fetchRequests: () => Promise<void>;
  fetchRequestById: (id: string) => Promise<BloodRequest | undefined>;
  createRequest: (data: Partial<BloodRequest>) => Promise<BloodRequest>;
  updateRequest: (id: string, data: Partial<BloodRequest>) => Promise<void>;
  deleteRequest: (id: string) => Promise<void>;
  setFilters: (filters: Partial<RequestState['filters']>) => void;
  setPage: (page: number) => void;
  pledgeToRequest: (requestId: string, pledge: Pledge) => Promise<void>;
}

export const useRequestStore = create<RequestState>()((set, get) => ({
  requests: [],
  currentRequest: null,
  filters: {},
  isLoading: false,
  pagination: {
    page: 1,
    pageSize: 12,
    total: 0,
    totalPages: 0,
  },

  // Computed values (updated when data changes)
  get total() {
    return this.pagination.total;
  },
  get totalPages() {
    return this.pagination.totalPages || Math.ceil(this.pagination.total / this.pagination.pageSize) || 1;
  },

  fetchRequests: async () => {
    set({ isLoading: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      let filtered = [...mockRequests];
      const { filters, pagination } = get();

      // Apply filters
      if (filters.bloodGroup) {
        filtered = filtered.filter((r) => r.bloodGroup === filters.bloodGroup);
      }
      if (filters.city) {
        filtered = filtered.filter((r) =>
          r.city.toLowerCase().includes(filters.city!.toLowerCase())
        );
      }
      if (filters.urgency) {
        filtered = filtered.filter((r) => r.urgency === filters.urgency);
      }
      if (filters.status) {
        filtered = filtered.filter((r) => r.status === filters.status);
      }
      if (filters.search) {
        const search = filters.search.toLowerCase();
        filtered = filtered.filter(
          (r) =>
            r.patientName.toLowerCase().includes(search) ||
            r.hospitalName?.toLowerCase().includes(search) ||
            r.reason.toLowerCase().includes(search)
        );
      }

      // Sort by date (newest first)
      filtered.sort(
        (a, b) =>
          new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime()
      );

      // Pagination
      const total = filtered.length;
      const start = (pagination.page - 1) * pagination.pageSize;
      const paginatedData = filtered.slice(start, start + pagination.pageSize);

      set({
        requests: paginatedData,
        isLoading: false,
        pagination: { 
          ...pagination, 
          total,
          totalPages: Math.ceil(total / pagination.pageSize) || 1
        },
      });
    } catch {
      set({ isLoading: false });
    }
  },

  fetchRequestById: async (id: string) => {
    set({ isLoading: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const request = mockRequests.find((r) => r.id === id);
      set({ currentRequest: request || null, isLoading: false });
      return request;
    } catch {
      set({ isLoading: false });
      return undefined;
    }
  },

  createRequest: async (data) => {
    set({ isLoading: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const newRequest: BloodRequest = {
        id: `request-${Date.now()}`,
        patientName: data.patientName || '',
        patientAge: data.patientAge || 0,
        bloodGroup: data.bloodGroup || 'O+',
        unitsNeeded: data.unitsNeeded || 1,
        unitsReceived: 0,
        urgency: data.urgency || 'medium',
        status: 'active',
        requestedBy: data.requestedBy || '',
        requesterName: data.requesterName || '',
        requesterType: data.requesterType || 'recipient',
        hospitalName: data.hospitalName,
        requestDate: new Date().toISOString().split('T')[0],
        requiredDate: data.requiredDate || '',
        reason: data.reason || '',
        contactPhone: data.contactPhone || '',
        contactEmail: data.contactEmail || '',
        city: data.city || '',
        state: data.state || '',
        notes: data.notes,
        pledges: [],
        location: data.location,
      };

      set((state) => ({
        requests: [newRequest, ...state.requests],
        isLoading: false,
      }));
      return newRequest;
    } catch {
      set({ isLoading: false });
      throw new Error('Failed to create request');
    }
  },

  updateRequest: async (id, data) => {
    set({ isLoading: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      set((state) => ({
        requests: state.requests.map((r) =>
          r.id === id ? { ...r, ...data } : r
        ),
        currentRequest:
          state.currentRequest?.id === id
            ? { ...state.currentRequest, ...data }
            : state.currentRequest,
        isLoading: false,
      }));
    } catch {
      set({ isLoading: false });
    }
  },

  deleteRequest: async (id) => {
    set({ isLoading: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      set((state) => ({
        requests: state.requests.filter((r) => r.id !== id),
        isLoading: false,
      }));
    } catch {
      set({ isLoading: false });
    }
  },

  setFilters: (filters) => {
    set((state) => ({ filters: { ...state.filters, ...filters }, pagination: { ...state.pagination, page: 1 } }));
    get().fetchRequests();
  },

  setPage: (page) => {
    set((state) => ({ pagination: { ...state.pagination, page } }));
    get().fetchRequests();
  },

  pledgeToRequest: async (requestId, pledge) => {
    set({ isLoading: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      set((state) => ({
        requests: state.requests.map((r) =>
          r.id === requestId
            ? { ...r, pledges: [...r.pledges, pledge], unitsReceived: r.unitsReceived + 1 }
            : r
        ),
        currentRequest:
          state.currentRequest?.id === requestId
            ? {
                ...state.currentRequest,
                pledges: [...state.currentRequest.pledges, pledge],
                unitsReceived: state.currentRequest.unitsReceived + 1,
              }
            : state.currentRequest,
        isLoading: false,
      }));
    } catch {
      set({ isLoading: false });
    }
  },
}));

// ============================================
// Notification Store
// ============================================

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;

  // Actions
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
}

export const useNotificationStore = create<NotificationState>()((set) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,

  fetchNotifications: async () => {
    set({ isLoading: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, 400));
      set({
        notifications: mockNotifications,
        unreadCount: mockNotifications.filter((n) => !n.isRead).length,
        isLoading: false,
      });
    } catch {
      set({ isLoading: false });
    }
  },

  markAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    }));
  },

  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
      unreadCount: 0,
    }));
  },

  deleteNotification: (id) => {
    set((state) => {
      const notification = state.notifications.find((n) => n.id === id);
      return {
        notifications: state.notifications.filter((n) => n.id !== id),
        unreadCount: notification && !notification.isRead
          ? state.unreadCount - 1
          : state.unreadCount,
      };
    });
  },

  addNotification: (notification) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    set((state) => ({
      notifications: [newNotification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    }));
  },
}));

// ============================================
// UI Store (for global UI state)
// ============================================

interface UIState {
  sidebarOpen: boolean;
  searchOpen: boolean;
  modalOpen: boolean;
  modalContent: string | null;
  isMobile: boolean;

  // Actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSearch: () => void;
  setSearchOpen: (open: boolean) => void;
  openModal: (content: string) => void;
  closeModal: () => void;
  setIsMobile: (isMobile: boolean) => void;
}

export const useUIStore = create<UIState>()((set) => ({
  sidebarOpen: true,
  searchOpen: false,
  modalOpen: false,
  modalContent: null,
  isMobile: false,

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSearch: () => set((state) => ({ searchOpen: !state.searchOpen })),
  setSearchOpen: (open) => set({ searchOpen: open }),
  openModal: (content) => set({ modalOpen: true, modalContent: content }),
  closeModal: () => set({ modalOpen: false, modalContent: null }),
  setIsMobile: (isMobile) => set({ isMobile }),
}));
