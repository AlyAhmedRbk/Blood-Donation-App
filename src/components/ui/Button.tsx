import React from 'react';
import { cn, cva } from '../../utils/helpers';
import { Loader2 } from 'lucide-react';

// ============================================
// Button Component - Enhanced Professional Design
// ============================================

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97] relative overflow-hidden',
  {
    variants: {
      variant: {
        primary: [
          'bg-gradient-to-r from-red-600 via-red-600 to-red-700 text-white',
          'shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40',
          'hover:from-red-700 hover:via-red-700 hover:to-red-800',
          'focus:ring-red-500/50',
          'before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/0 before:via-white/20 before:to-white/0',
          'before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700',
        ].join(' '),
        secondary: [
          'bg-white text-primary border-2 border-primary',
          'hover:bg-red-50 hover:border-red-600',
          'focus:ring-primary/50',
          'shadow-md hover:shadow-lg',
        ].join(' '),
        outline: [
          'border-2 border-gray-200 bg-white/80 backdrop-blur-sm text-gray-700',
          'hover:border-primary hover:text-primary hover:bg-red-50/50',
          'focus:ring-primary/50',
          'shadow-sm hover:shadow-md',
        ].join(' '),
        ghost: [
          'text-gray-600 bg-transparent',
          'hover:bg-gray-100 hover:text-gray-900',
          'focus:ring-gray-200',
        ].join(' '),
        danger: [
          'bg-gradient-to-r from-red-600 to-red-700 text-white',
          'shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40',
          'hover:from-red-700 hover:to-red-800',
          'focus:ring-red-500/50',
        ].join(' '),
        success: [
          'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white',
          'shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40',
          'hover:from-emerald-600 hover:to-emerald-700',
          'focus:ring-emerald-500/50',
        ].join(' '),
        glass: [
          'bg-white/10 backdrop-blur-md text-white border border-white/20',
          'hover:bg-white/20 hover:border-white/30',
          'focus:ring-white/30',
          'shadow-lg shadow-black/10',
        ].join(' '),
        gradient: [
          'bg-gradient-to-r from-red-600 via-orange-500 to-red-600 text-white',
          'shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40',
          'hover:from-red-700 hover:via-orange-600 hover:to-red-800',
          'focus:ring-orange-500/50',
          'bg-[length:200%_auto] hover:bg-right',
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
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'glass' | 'gradient';
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
        {isLoading ? (
          <motion.loader>
            <Loader2 className="h-4 w-4 animate-spin" />
          </motion.loader>
        ) : leftIcon ? (
          <span className="inline-flex items-center">{leftIcon}</span>
        ) : null}
        <span className="relative z-10">{children}</span>
        {!isLoading && rightIcon && (
          <span className="inline-flex items-center">{rightIcon}</span>
        )}
      </button>
    );
  }
);

// Simple motion loader component
const motion = {
  loader: ({ children }: { children: React.ReactNode }) => <>{children}</>
};

Button.displayName = 'Button';

export { Button, buttonVariants };
