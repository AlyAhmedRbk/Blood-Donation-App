import React from 'react';
import { cn } from '../../utils/helpers';

// ============================================
// Skeleton Loader Component
// ============================================

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'text',
  width,
  height,
}) => {
  const variants = {
    text: 'rounded h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  return (
    <div
      className={cn(
        'animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer',
        variants[variant],
        className
      )}
      style={{
        width: width || (variant === 'circular' ? height || '40px' : '100%'),
        height: height || (variant === 'text' ? '1rem' : variant === 'circular' ? '40px' : '80px'),
      }}
      aria-hidden="true"
    />
  );
};

// ============================================
// Card Skeleton
// ============================================

interface CardSkeletonProps {
  showAvatar?: boolean;
  lines?: number;
}

export const CardSkeleton: React.FC<CardSkeletonProps> = ({
  showAvatar = false,
  lines = 3,
}) => (
  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
    {showAvatar && (
      <div className="flex items-center mb-4">
        <Skeleton variant="circular" width={48} height={48} />
        <div className="ml-4 flex-1">
          <Skeleton width="60%" height={16} />
          <Skeleton width="40%" height={12} className="mt-2" />
        </div>
      </div>
    )}
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton
        key={i}
        width={i === lines - 1 ? '70%' : '100%'}
        height={16}
        className={i > 0 ? 'mt-3' : ''}
      />
    ))}
  </div>
);

// ============================================
// Table Skeleton
// ============================================

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({
  rows = 5,
  columns = 4,
}) => (
  <div className="w-full overflow-hidden rounded-2xl border border-gray-200">
    {/* Header */}
    <div className="bg-gray-50 px-6 py-4 grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton key={i} height={14} width="80%" />
      ))}
    </div>
    {/* Rows */}
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div
        key={rowIndex}
        className="px-6 py-4 border-t border-gray-100 grid gap-4"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {Array.from({ length: columns }).map((_, colIndex) => (
          <Skeleton key={colIndex} height={14} width={colIndex === 0 ? '90%' : '70%'} />
        ))}
      </div>
    ))}
  </div>
);

// ============================================
// Stats Card Skeleton
// ============================================

export const StatsCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
    <div className="flex items-center justify-between mb-4">
      <Skeleton variant="circular" width={48} height={48} />
      <Skeleton width={60} height={24} />
    </div>
    <Skeleton height={28} width="50%" className="mb-2" />
    <Skeleton height={14} width="30%" />
  </div>
);
