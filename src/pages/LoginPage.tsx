import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Droplets,
  AlertCircle,
} from 'lucide-react';
import toast from 'react-hot-toast';

import { loginSchema, type LoginFormData } from '../validations/schemas';
import { useAuth } from '../hooks';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

// ============================================
// Login Page
// ============================================

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuth();
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  // Clear errors when component mounts
  React.useEffect(() => {
    clearError();
  }, [clearError]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      clearError();
      const success = await login(data.email, data.password);

      if (success) {
        toast.success('Welcome back! You have successfully logged in.');
        
        // Redirect based on role
        const user = useAuthStore.getState().user;
        switch (user?.role) {
          case 'admin':
            navigate('/dashboard/admin');
            break;
          case 'hospital':
            navigate('/dashboard/hospital');
            break;
          case 'donor':
            navigate('/dashboard/donor');
            break;
          case 'recipient':
            navigate('/dashboard/recipient');
            break;
          default:
            navigate('/dashboard');
        }
      } else {
        toast.error(error || 'Invalid email or password');
      }
    } catch (err) {
      toast.error('An error occurred during login');
    }
  };

  // Demo account quick fill
  const fillDemoAccount = (role: 'donor' | 'recipient' | 'hospital' | 'admin') => {
    const accounts = {
      donor: { email: 'donor@lifeblood.com', password: 'Password123!' },
      recipient: { email: 'recipient@lifeblood.com', password: 'Password123!' },
      hospital: { email: 'hospital@lifeblood.com', password: 'Password123!' },
      admin: { email: 'admin@lifeblood.com', password: 'Admin123!' },
    };
    
    const account = accounts[role];
    // Use react-hook-form's setValue
    const form = document.querySelector('form') as HTMLFormElement;
    if (form) {
      const emailInput = form.querySelector('#email') as HTMLInputElement;
      const passwordInput = form.querySelector('#password') as HTMLInputElement;
      if (emailInput) {
        emailInput.value = account.email;
        emailInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
      if (passwordInput) {
        passwordInput.value = account.password;
        passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
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
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
        <p className="text-gray-600">
          Sign in to continue saving lives
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{error}</p>
        </motion.div>
      )}

      {/* Demo Accounts */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <p className="text-sm font-medium text-blue-800 mb-2">Quick Demo Access:</p>
        <div className="flex flex-wrap gap-2">
          {(['donor', 'recipient', 'hospital'] as const).map((role) => (
            <button
              key={role}
              onClick={() => fillDemoAccount(role)}
              className="px-3 py-1.5 bg-white border border-blue-200 rounded-lg text-xs font-medium text-blue-700 hover:bg-blue-100 transition-colors capitalize"
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
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
            placeholder="Enter your password"
            leftIcon={<Lock className="w-5 h-5" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-1 hover:text-gray-600 transition-colors"
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            }
            error={errors.password?.message}
            required
            {...register('password')}
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
              {...register('rememberMe')}
            />
            <span className="text-sm text-gray-600">Remember me</span>
          </label>

          <Link
            to="/forgot-password"
            className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full"
          size="lg"
          isLoading={isLoading}
        >
          Sign In
        </Button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-4">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-sm text-gray-500">or continue with</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Social Login */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span className="text-sm font-medium text-gray-700">Google</span>
        </button>

        <button
          type="button"
          className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          <span className="text-sm font-medium text-gray-700">GitHub</span>
        </button>
      </div>

      {/* Sign Up Link */}
      <p className="mt-8 text-center text-gray-600">
        Don't have an account?{' '}
        <Link
          to="/register"
          className="font-semibold text-primary hover:text-primary-dark transition-colors"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
};

// Need to import useAuthStore for demo account functionality
import { useAuthStore } from '../store';
