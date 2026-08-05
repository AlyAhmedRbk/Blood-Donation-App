// ============================================
// Blood Donation System - TypeScript Types
// ============================================

// User & Authentication Types
export type UserRole = 'donor' | 'recipient' | 'hospital' | 'admin' | 'guest';

export interface User {
  id: string;
  email: string;
  password?: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phone: string;
  createdAt: string;
  isActive: boolean;
}

export interface DonorProfile extends User {
  bloodGroup: BloodGroup;
  age: number;
  weight: number;
  gender: 'male' | 'female' | 'other';
  address: string;
  city: string;
  state: string;
  zipCode: string;
  isAvailable: boolean;
  lastDonationDate: string | null;
  totalDonations: number;
  eligibilityDate: string | null;
  medicalHistory?: MedicalRecord[];
  donations: Donation[];
  pledges: Pledge[];
}

export interface RecipientProfile extends User {
  organizationName?: string;
  requests: BloodRequest[];
}

export interface HospitalProfile extends User {
  hospitalName: string;
  licenseNumber: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  coordinates: { lat: number; lng: number };
  requests: BloodRequest[];
}

export interface MedicalRecord {
  id: string;
  condition: string;
  diagnosedDate: string;
  isChronic: boolean;
  medications?: string[];
}

// Blood Types
export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export const BLOOD_GROUPS: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

// Request Types
export type UrgencyLevel = 'critical' | 'high' | 'medium' | 'low';
export type RequestStatus = 'pending' | 'active' | 'fulfilled' | 'cancelled' | 'expired';
export type PledgeStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface BloodRequest {
  id: string;
  patientName: string;
  patientAge: number;
  bloodGroup: BloodGroup;
  unitsNeeded: number;
  unitsReceived: number;
  urgency: UrgencyLevel;
  status: RequestStatus;
  requestedBy: string; // user ID
  requesterName: string;
  requesterType: 'recipient' | 'hospital';
  hospitalName?: string;
  requestDate: string;
  requiredDate: string;
  reason: string;
  contactPhone: string;
  contactEmail: string;
  city: string;
  state: string;
  notes?: string;
  pledges: Pledge[];
  location?: {
    ward?: string;
    roomNumber?: string;
    address: string;
  };
}

export interface Pledge {
  id: string;
  requestId: string;
  donorId: string;
  donorName: string;
  donorBloodGroup: BloodGroup;
  status: PledgeStatus;
  pledgedDate: string;
  scheduledDate?: string;
  scheduledTime?: string;
  completedDate?: string;
  notes?: string;
}

// Donation Types
export interface Donation {
  id: string;
  donorId: string;
  requestId: string;
  patientName: string;
  bloodGroup: BloodGroup;
  units: number;
  donationDate: string;
  hospitalName: string;
  certificateUrl?: string;
}

// Notification Types
export type NotificationType = 'request' | 'pledge' | 'reminder' | 'system' | 'success' | 'alert';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  actionUrl?: string;
  createdAt: string;
}

// Statistics Types
export interface PlatformStats {
  totalDonors: number;
  totalDonations: number;
  livesSaved: number;
  activeRequests: number;
  partnerHospitals: number;
  pintsCollected: number;
}

export interface MonthlyStats {
  month: string;
  donations: number;
  newDonors: number;
  requests: number;
}

export interface BloodGroupStats {
  bloodGroup: BloodGroup;
  count: number;
  percentage: number;
  demand: number;
}

// Search & Filter Types
export interface SearchFilters {
  bloodGroup?: BloodGroup;
  city?: string;
  urgency?: UrgencyLevel;
  status?: RequestStatus;
  radius?: number;
  sortBy?: 'date' | 'urgency' | 'distance';
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Form Types
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  phone: string;
  agreeTerms: boolean;
}

export interface DonorOnboardingData {
  bloodGroup: BloodGroup;
  age: number;
  weight: number;
  gender: 'male' | 'female' | 'other';
  lastDonationDate: string;
  city: string;
  state: string;
  address: string;
  zipCode: string;
  isAvailable: boolean;
}

export interface CreateRequestData {
  patientName: string;
  patientAge: number;
  bloodGroup: BloodGroup;
  unitsNeeded: number;
  urgency: UrgencyLevel;
  requiredDate: string;
  reason: string;
  contactPhone: string;
  contactEmail: string;
  hospitalName?: string;
  city: string;
  state: string;
  address: string;
  notes?: string;
}

// UI State Types
export type ModalMode = 'create' | 'edit' | 'view' | 'delete';
export type TabValue = string;

// Donor Card Type
export interface DonorCard {
  donorId: string;
  donorName: string;
  bloodGroup: BloodGroup;
  donationsCount: number;
  issueDate: string;
  expiryDate: string;
  qrCode: string;
}

// Compatibility Matrix Type
export interface CompatibilityInfo {
  canDonateTo: BloodGroup[];
  canReceiveFrom: BloodGroup[];
}
