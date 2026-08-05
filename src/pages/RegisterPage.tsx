import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Droplets,
  User,
  Phone,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import toast from 'react-hot-toast';

import { registerSchema, type RegisterFormData } from '../validations/schemas';
import { useAuth } from '../hooks';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

// ============================================
// Register Page
// ============================================

const steps = [
  { id: 1, title: 'Account', description: 'Create your account' },
  { id: 2, title: 'Personal', description: 'Your information' },
  { id: 3, title: 'Complete', description: 'You\'re all set!' },
];

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register: registerUser, isLoading } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'donor',
      phone: '',
      agreeTerms: false as unknown as undefined, // Will be set by user
    },
  });

  const selectedRole = watch('role');

  const onNextStep = async () => {
    let fieldsToValidate: (keyof RegisterFormData)[] = [];
    
    if (currentStep === 1) {
      fieldsToValidate = ['email', 'password', 'confirmPassword'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['name', 'role', 'phone', 'agreeTerms'];
    }

    const isValid = await trigger(fieldsToValidate);
    
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const onPrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const success = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
        phone: data.phone,
      });

      if (success) {
        toast.success('Account created successfully! Welcome to LifeBlood.');
        
        // Redirect based on role
        switch (data.role) {
          case 'donor':
            navigate('/onboarding');
            break;
          case 'hospital':
          case 'recipient':
            navigate('/dashboard');
            break;
          default:
            navigate('/dashboard');
        }
      } else {
        toast.error('Registration failed. Please try again.');
      }
    } catch (err) {
      toast.error('An error occurred during registration');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <Link to="/" className="inline-flex items-center gap-2 mb-6 group">
          <motion.div
            whileHover={{ rotate: 15 }}
            className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-lg shadow-red-500/25"
          >
            <Droplets className="w-7 h-7 text-white" />
          </motion.div>
        </Link>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create account</h1>
        <p className="text-gray-600">Join our community of life-savers</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <button
                onClick={() => step.id < currentStep && setCurrentStep(step.id)}
                disabled={step.id > currentStep}
                className={`flex flex-col items-center ${
                  step.id > currentStep ? 'cursor-not-allowed' : ''
                }`}
              >
                <motion.div
                  initial={false}
                  animate={{
                    backgroundColor:
                      step.id <= currentStep ? '#dc2626' : '#e5e7eb',
                    scale: step.id === currentStep ? 1.1 : 1,
                  }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                    step.id <= currentStep ? 'text-white' : 'text-gray-500'
                  }`}
                >
                  {step.id < currentStep ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    step.id
                  )}
                </motion.div>
                <span
                  className={`mt-2 text-xs font-medium ${
                    step.id <= currentStep ? 'text-primary' : 'text-gray-400'
                  }`}
                >
                  {step.title}
                </span>
              </button>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 mt-[-20px] ${
                    step.id < currentStep ? 'bg-primary' : 'bg-gray-200'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Step 1: Account Details */}
          {currentStep === 1 && (
            <form onSubmit={(e) => { e.preventDefault(); onNextStep(); }} className="space-y-5" noValidate>
              <Input
                id="email"
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                leftIcon={<Mail className="w-5 h-5" />}
                error={errors.email?.message}
                required
                {...register('email')}
              />

              <div className="relative">
                <Input
                  id="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  leftIcon={<Lock className="w-5 h-5" />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-1 hover:text-gray-600 transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  }
                  helperText="Must be 8+ characters with uppercase, lowercase, and number"
                  error={errors.password?.message}
                  required
                  {...register('password')}
                />
              </div>

              <div className="relative">
                <Input
                  id="confirmPassword"
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Re-enter your password"
                  leftIcon={<ShieldCheck className="w-5 h-5" />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="p-1 hover:text-gray-600 transition-colors"
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  }
                  error={errors.confirmPassword?.message}
                  required
                  {...register('confirmPassword')}
                />
              </div>

              {/* Password Strength Indicator */}
              <PasswordStrengthIndicator password={watch('password') || ''} />

              <Button
                type="submit"
                className="w-full"
                size="lg"
              >
                Continue
              </Button>
            </form>
          )}

          {/* Step 2: Personal Information */}
          {currentStep === 2 && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              <Input
                id="name"
                label="Full Name"
                type="text"
                placeholder="John Doe"
                leftIcon={<User className="w-5 h-5" />}
                error={errors.name?.message}
                required
                {...register('name')}
              />

              <Input
                id="phone"
                label="Phone Number"
                type="tel"
                placeholder="+1 (555) 000-0000"
                leftIcon={<Phone className="w-5 h-5" />}
                error={errors.phone?.message}
                required
                {...register('phone')}
              />

              {/* Role Selection */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  I want to <span className="text-primary">*</span>
                </label>
                
                <div className="grid grid-cols-3 gap-3">
                  {[
                    {
                      value: 'donor',
                      label: 'Donate Blood',
                      icon: '🩸',
                      desc: 'Save lives',
                    },
                    {
                      value: 'recipient',
                      label: 'Request Blood',
                      icon: '🏥',
                      desc: 'For patients',
                    },
                    {
                      value: 'hospital',
                      label: 'Hospital',
                      icon: '🏥',
                      desc: 'Medical center',
                    },
                  ].map((role) => (
                    <label
                      key={role.value}
                      className={`relative cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                        selectedRole === role.value
                          ? 'border-primary bg-red-50 shadow-md shadow-red-100'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        value={role.value}
                        className="sr-only"
                        {...register('role')}
                      />
                      <span className="text-2xl block mb-2">{role.icon}</span>
                      <span className="block text-sm font-semibold text-gray-900">
                        {role.label}
                      </span>
                      <span className="text-xs text-gray-500">{role.desc}</span>
                      
                      {selectedRole === role.value && (
                        <motion.div
                          layoutId="selected-role"
                          className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center"
                        >
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </motion.div>
                      )}
                    </label>
                  ))}
                </div>
                
                {errors.role && (
                  <p className="text-sm text-red-600 flex items-center gap-1 mt-2">
                    <AlertCircle className="w-4 h-4" />
                    {errors.role.message}
                  </p>
                )}
              </div>

              {/* Terms Agreement */}
              <label className="flex items-start gap-3 cursor-pointer p-4 bg-gray-50 rounded-xl border border-gray-200">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary mt-0.5"
                  {...register('agreeTerms')}
                />
                <span className="text-sm text-gray-600">
                  I agree to the{' '}
                  <Link to="/terms" className="text-primary hover:underline font-medium">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-primary hover:underline font-medium">
                    Privacy Policy
                  </Link>
                </span>
              </label>
              
              {errors.agreeTerms && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.agreeTerms.message}
                </p>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onPrevStep}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  size="lg"
                  isLoading={isLoading}
                >
                  Create Account
                </Button>
              </div>
            </form>
          )}

          {/* Step 3: Success */}
          {currentStep === 3 && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </motion.div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Account Created!
              </h2>
              <p className="text-gray-600 mb-6">
                Welcome to LifeBlood! You're now part of a community saving lives every day.
              </p>

              <div className="space-y-3">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => navigate('/login')}
                >
                  Sign In Now
                </Button>
                <Link
                  to="/"
                  className="block text-center text-gray-600 hover:text-primary transition-colors"
                >
                  Go to Homepage
                </Link>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Sign In Link */}
      {currentStep < 3 && (
        <p className="mt-8 text-center text-gray-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-primary hover:text-primary-dark transition-colors"
          >
            Sign in
          </Link>
        </p>
      )}
    </div>
  );
};

// ============================================
// Password Strength Indicator
// ============================================

interface PasswordStrengthProps {
  password: string;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthProps> = ({ password }) => {
  const getStrength = () => {
    if (!password) return { score: 0, label: '', color: '' };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (password.match(/[a-z]/)) score++;
    if (password.match(/[A-Z]/)) score++;
    if (password.match(/[0-9]/)) score++;
    if (password.match(/[^a-zA-Z0-9]/)) score++;

    if (score <= 2)
      return { score: 25, label: 'Weak', color: 'bg-red-500' };
    if (score <= 3)
      return { score: 50, label: 'Fair', color: 'bg-yellow-500' };
    if (score <= 4)
      return { score: 75, label: 'Good', color: 'bg-blue-500' };
    return { score: 100, label: 'Strong', color: 'bg-green-500' };
  };

  const strength = getStrength();

  if (!password) return null;

  const textColorClass = strength.color.replace('bg-', 'text-');
  
  return (
    <div className="space-y-2">
      <div className="flex gap-1">
        {[25, 50, 75, 100].map((threshold) => {
          const isActive = strength.score >= threshold;
          const barClass = isActive ? strength.color : 'bg-gray-200';
          return (
            <div
              key={threshold}
              className={'h-1.5 flex-1 rounded-full transition-all duration-300 ' + barClass}
            />
          );
        })}
      </div>
      <p className={'text-xs font-medium ' + textColorClass}>
        Password strength: {strength.label}
      </p>
    </div>
  );
};
