import React from 'react';
import { cn } from '../../utils/helpers';

// ============================================
// Card Component
// ============================================

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'bordered' | 'elevated';
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hover = true, padding = 'md', children, ...props }, ref) => {
    const variants = {
      default: 'bg-white shadow-lg shadow-gray-200/50 border border-gray-100',
      glass: 'backdrop-blur-md bg-white/80 shadow-lg border border-white/20',
      bordered: 'bg-white border-2 border-gray-100',
      elevated: 'bg-white shadow-xl shadow-gray-200/60',
    };

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl transition-all duration-300',
          variants[variant],
          paddings[padding],
          hover && 'hover:shadow-xl hover:-translate-y-1 hover:shadow-red-100/20',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// ============================================
// Card Header, Body, Footer Sub-components
// ============================================

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  action?: React.ReactNode;
}

const CardHeader: React.FC<CardHeaderProps> = ({ className, children, action, ...props }) => (
  <div className={cn('flex items-center justify-between mb-4', className)} {...props}>
    <div>{children}</div>
    {action && <div>{action}</div>}
  </div>
);

interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardBody: React.FC<CardBodyProps> = ({ className, children, ...props }) => (
  <div className={cn('', className)} {...props}>
    {children}
  </div>
);

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardFooter: React.FC<CardFooterProps> = ({ className, children, ...props }) => (
  <div className={cn('mt-4 pt-4 border-t border-gray-100 flex items-center gap-3', className)} {...props}>
    {children}
  </div>
);

export { Card, CardHeader, CardBody, CardFooter };
