import { z } from 'zod';

// ============================================
// Blood Donation System - Zod Validation Schemas
// ============================================

// Auth Schemas
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().default(false),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Full name is required')
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name must be less than 100 characters'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email address'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      ),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    role: z.enum(['donor', 'recipient', 'hospital'], {
      required_error: 'Please select a role',
    }),
    phone: z
      .string()
      .min(1, 'Phone number is required')
      .regex(/^[+]?[\d\s-()]{10,}$/, 'Please enter a valid phone number'),
    agreeTerms: z.literal(true, {
      errorMap: () => ({ message: 'You must accept the terms and conditions' }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

// Donor Onboarding Schema
export const donorOnboardingSchema = z.object({
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
    required_error: 'Please select your blood group',
  }),
  age: z
    .number({
      required_error: 'Age is required',
      invalid_type_error: 'Age must be a number',
    })
    .min(18, 'You must be at least 18 years old to donate')
    .max(65, 'Maximum age for donation is 65 years'),
  weight: z
    .number({
      required_error: 'Weight is required',
      invalid_type_error: 'Weight must be a number',
    })
    .min(50, 'Minimum weight requirement is 50 kg (110 lbs)')
    .max(200, 'Please enter a valid weight'),
  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'Please select your gender',
  }),
  lastDonationDate: z.string().optional().nullable(),
  city: z
    .string()
    .min(1, 'City is required')
    .min(2, 'Please enter a valid city name'),
  state: z
    .string()
    .min(1, 'State is required')
    .min(2, 'Please enter a valid state name'),
  address: z
    .string()
    .min(1, 'Address is required')
    .min(10, 'Please enter your full address'),
  zipCode: z
    .string()
    .min(1, 'ZIP code is required')
    .regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code'),
  isAvailable: z.boolean().default(true),
});

export type DonorOnboardingFormData = z.infer<typeof donorOnboardingSchema>;

// Blood Request Schema
export const createRequestSchema = z
  .object({
    patientName: z
      .string()
      .min(1, "Patient's name is required")
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name must be less than 100 characters'),
    patientAge: z
      .number({
        required_error: "Patient's age is required",
        invalid_type_error: 'Age must be a number',
      })
      .min(0, 'Age cannot be negative')
      .max(120, 'Please enter a valid age'),
    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
      required_error: 'Please select blood group needed',
    }),
    unitsNeeded: z
      .number({
        required_error: 'Number of units is required',
        invalid_type_error: 'Units must be a number',
      })
      .min(1, 'At least 1 unit is required')
      .max(10, 'Maximum 10 units can be requested at once'),
    urgency: z.enum(['critical', 'high', 'medium', 'low'], {
      required_error: 'Please select urgency level',
    }),
    requiredDate: z
      .string()
      .min(1, 'Required date is needed')
      .refine((date) => new Date(date) >= new Date(), {
        message: 'Date must be today or in the future',
      }),
    reason: z
      .string()
      .min(1, 'Reason for blood request is required')
      .min(10, 'Please provide more details about the medical need')
      .max(500, 'Reason must be under 500 characters'),
    contactPhone: z
      .string()
      .min(1, 'Contact phone is required')
      .regex(/^[+]?[\d\s-()]{10,}$/, 'Please enter a valid phone number'),
    contactEmail: z
      .string()
      .min(1, 'Contact email is required')
      .email('Please enter a valid email address'),
    hospitalName: z.string().optional(),
    city: z
      .string()
      .min(1, 'City is required')
      .min(2, 'Please enter a valid city name'),
    state: z
      .string()
      .min(1, 'State is required')
      .min(2, 'Please enter a valid state name'),
    address: z
      .string()
      .min(1, 'Hospital/Location address is required')
      .min(10, 'Please enter full address'),
    notes: z
      .string()
      .max(500, 'Notes must be under 500 characters')
      .optional()
      .default(''),
  })
  .refine((data) => data.unitsNeeded > 0, {
    message: 'At least 1 unit is required',
    path: ['unitsNeeded'],
  });

export type CreateRequestFormData = z.infer<typeof createRequestSchema>;

// Pledge/Donate Schema
export const pledgeSchema = z.object({
  scheduledDate: z
    .string()
    .min(1, 'Please select a donation date')
    .refine((date) => new Date(date) >= new Date(), {
      message: 'Date must be today or in the future',
    }),
  scheduledTime: z
    .string()
    .min(1, 'Please select a preferred time'),
  notes: z
    .string()
    .max(300, 'Notes must be under 300 characters')
    .optional()
    .default(''),
});

export type PledgeFormData = z.infer<typeof pledgeSchema>;

// Profile Update Schema
export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters'),
  phone: z
    .string()
    .min(1, 'Phone is required')
    .regex(/^[+]?[\d\s-()]{10,}$/, 'Please enter a valid phone number'),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

// Password Change Schema
export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, 'Current password is required')
      .min(8, 'Password must be at least 8 characters'),
    newPassword: z
      .string()
      .min(1, 'New password is required')
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain uppercase, lowercase, and number'
      ),
    confirmPassword: z.string().min(1, 'Please confirm new password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

// Search/Filter Schema
export const searchFilterSchema = z.object({
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
  city: z.string().optional(),
  urgency: z.enum(['critical', 'high', 'medium', 'low']).optional(),
  sortBy: z.enum(['date', 'urgency', 'distance']).optional(),
});

export type SearchFilterFormData = z.infer<typeof searchFilterSchema>;
