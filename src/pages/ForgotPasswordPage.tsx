import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Mail,
  ArrowLeft,
  CheckCircle2,
  Droplets,
} from 'lucide-react';
import toast from 'react-hot-toast';

import { z } from 'zod';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

// ============================================
// Forgot Password Page
// ============================================

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const ForgotPasswordPage: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsSubmitted(true);
    toast.success('Reset link sent to your email!');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <Link to="/login" className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to login</span>
        </Link>

        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <Mail className="w-8 h-8 text-blue-600" />
        </motion.div>

        {!isSubmitted ? (
          <>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Forgot password?
            </h1>
            <p className="text-gray-600">
              No worries! Enter your email and we'll send you a reset link.
            </p>
          </>
        ) : (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </motion.div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Check your email
            </h1>
            <p className="text-gray-600">
              We've sent a password reset link to{' '}
              <span className="font-medium text-gray-900">
                {/* This would show the actual email in a real app */}
                your email
              </span>
            </p>
          </>
        )}
      </div>

      {/* Form */}
      {!isSubmitted ? (
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

          <Button
            type="submit"
            className="w-full"
            size="lg"
            isLoading={isLoading}
          >
            Send Reset Link
          </Button>
        </form>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
            <p className="text-sm text-green-700">
              <strong>Didn't receive the email?</strong> Check your spam folder or{' '}
              <button
                onClick={() => setIsSubmitted(false)}
                className="font-semibold underline hover:text-green-800"
              >
                try again
              </button>
            </p>
          </div>

          <Button
            className="w-full"
            size="lg"
            onClick={() => window.location.href = '/login'}
          >
            Return to Login
          </Button>
        </motion.div>
      )}

      {/* Additional Help */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500 text-center mb-3">
          Need more help? Contact our support team.
        </p>
        <a
          href="mailto:support@lifeblood.com"
          className="block text-center text-sm font-medium text-primary hover:text-primary-dark transition-colors"
        >
          support@lifeblood.com
        </a>
      </div>
    </div>
  );
};
