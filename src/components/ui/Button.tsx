import React from 'react';
import { cn, cva } from '../../utils/helpers';
import { Loader2 } from 'lucide-react';

// ============================================
// Button Component
// ============================================

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-white hover:bg-primary-dark shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/30 focus:ring-primary/50',
        secondary:
          'bg-white text-primary border-2 border-primary hover:bg-accent focus:ring-primary/50',
        outline:
          'border-2 border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary focus:ring-primary/50',
        ghost:
          'text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-200',
        danger:
          'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-500/25 focus:ring-red-500/50',
        success:
          'bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-500/25 focus:ring-green-500/50',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6 text-base',
        lg: 'h-13 px-8 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'icon';
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
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : leftIcon ? (
          <span className="inline-flex">{leftIcon}</span>
        ) : null}
        {children}
        {!isLoading && rightIcon && <span className="inline-flex">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
