import React from 'react';
import { cn, cva } from '../../utils/helpers';
import { Loader2 } from 'lucide-react';

// ============================================
// Button Component - Professional Enhanced Design
// ============================================

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97] relative overflow-hidden group',
  {
    variants: {
      variant: {
        // Primary - Deep Red/Crimson with gradient
        primary: [
          'bg-gradient-to-r from-red-600 via-red-600 to-red-700 text-white',
          'shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40',
          'hover:from-red-700 hover:via-red-700 hover:to-red-800',
          'focus:ring-red-500/50',
          'border border-red-500/20',
        ].join(' '),
        
        // Secondary - Clean white with red accent
        secondary: [
          'bg-white text-red-600 border-2 border-red-500',
          'hover:bg-red-50 hover:border-red-600 hover:text-red-700',
          'focus:ring-red-500/50',
          'shadow-md hover:shadow-lg',
        ].join(' '),
        
        // Outline - Subtle bordered style
        outline: [
          'border-2 border-gray-200 bg-white/90 backdrop-blur-sm text-gray-700',
          'hover:border-red-400 hover:text-red-600 hover:bg-red-50/50',
          'focus:ring-red-500/50',
          'shadow-sm hover:shadow-md',
        ].join(' '),
        
        // Ghost - Minimal transparent style
        ghost: [
          'text-gray-600 bg-transparent',
          'hover:bg-gray-100 hover:text-gray-900',
          'focus:ring-gray-200',
        ].join(' '),
        
        // Danger - For destructive actions
        danger: [
          'bg-gradient-to-r from-red-600 to-rose-600 text-white',
          'shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40',
          'hover:from-red-700 hover:to-rose-700',
          'focus:ring-red-500/50',
        ].join(' '),
        
        // Success - For positive actions
        success: [
          'bg-gradient-to-r from-emerald-500 to-green-600 text-white',
          'shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40',
          'hover:from-emerald-600 hover:to-green-700',
          'focus:ring-emerald-500/50',
        ].join(' '),
        
        // Glass - Glassmorphism effect for dark backgrounds
        glass: [
          'bg-white/15 backdrop-blur-md text-white border border-white/25',
          'hover:bg-white/25 hover:border-white/40',
          'focus:ring-white/30',
          'shadow-lg shadow-black/10',
        ].join(' '),
        
        // Gradient - Vibrant multi-color gradient
        gradient: [
          'bg-gradient-to-r from-red-600 via-orange-500 to-red-600 text-white',
          'shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/35',
          'hover:from-red-700 hover:via-orange-600 hover:to-red-800',
          'focus:ring-orange-500/50',
          'bg-[length:200%_auto] hover:bg-right',
        ].join(' '),

        // Premium - Dark elegant style
        premium: [
          'bg-gradient-to-r from-gray-800 to-gray-900 text-white',
          'shadow-xl shadow-gray-900/30 hover:shadow-2xl hover:shadow-gray-900/40',
          'hover:from-gray-900 hover:to-black',
          'focus:ring-gray-500/50',
          'border border-gray-700/50',
        ].join(' '),

        // Warning - Amber/orange for caution actions
        warning: [
          'bg-gradient-to-r from-amber-500 to-orange-500 text-white',
          'shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40',
          'hover:from-amber-600 hover:to-orange-600',
          'focus:ring-amber-500/50',
        ].join(' '),
      },
      size: {
        sm: 'h-9 px-4 text-sm rounded-lg',
        md: 'h-11 px-6 text-base rounded-xl',
        lg: 'h-13 px-8 text-lg rounded-xl',
        xl: 'h-14 px-10 text-lg rounded-xl',
        icon: 'h-10 w-10 rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'glass' | 'gradient' | 'premium' | 'warning';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled || isLoading}
        {...props}
      >
        {/* Shimmer overlay effect */}
        <span className="absolute inset-0 overflow-hidden rounded-inherit">
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </span>
        
        {/* Content */}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : leftIcon ? (
            <span className="inline-flex items-center">{leftIcon}</span>
          ) : null}
          {children}
          {!isLoading && rightIcon && (
            <span className="inline-flex items-center">{rightIcon}</span>
          )}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
