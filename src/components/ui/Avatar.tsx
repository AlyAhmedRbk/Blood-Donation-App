import React from 'react';
import { cn } from '../../utils/helpers';
import { User } from 'lucide-react';

// ============================================
// Avatar Component
// ============================================

interface AvatarProps {
  src?: string | null;
  alt: string;
  name?: string; // Alias for alt, for convenience
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
  className?: string;
  isOnline?: boolean;
}

const sizes = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-xl',
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  size = 'md',
  fallback,
  className,
  isOnline = false,
}) => {
  const [imageError, setImageError] = React.useState(false);
  const displayName = name || alt;

  const initials = React.useMemo(() => {
    if (fallback) return fallback;
    return alt
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }, [alt, fallback]);

  if (!src || imageError) {
    return (
      <div
        className={cn(
          'relative inline-flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark text-white font-semibold select-none overflow-hidden',
          sizes[size],
          className
        )}
        role="img"
        aria-label={alt}
      >
        {initials}
        {isOnline && (
          <span
            className={cn(
              'absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white',
              size === 'xs' || size === 'sm' ? 'w-1.5 h-1.5' : 'w-3 h-3',
              'bg-green-500'
            )}
            aria-label="Online"
          />
        )}
      </div>
    );
  }

  return (
    <div className={cn('relative inline-block', className)}>
      <img
        src={src}
        alt={alt}
        className={cn(
          'rounded-full object-cover ring-2 ring-white shadow-md',
          sizes[size]
        )}
        onError={() => setImageError(true)}
      />
      {isOnline && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full border-2 border-white bg-green-500',
            size === 'xs' || size === 'sm' ? 'w-2 h-2' : 'w-3.5 h-3.5'
          )}
          aria-label="Online"
        />
      )}
    </div>
  );
};

// ============================================
// Avatar Group Component
// ============================================

interface AvatarGroupProps {
  avatars: Array<{ src?: string; name: string }>;
  max?: number;
  size?: 'xs' | 'sm' | 'md';
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  max = 4,
  size = 'sm',
}) => {
  const visibleAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;

  return (
    <div className="flex -space-x-2">
      {visibleAvatars.map((avatar, index) => (
        <Avatar
          key={index}
          src={avatar.src}
          alt={avatar.name}
          size={size}
          className="ring-2 ring-white"
        />
      ))}
      {remainingCount > 0 && (
        <div
          className={cn(
            'inline-flex items-center justify-center rounded-full bg-gray-200 text-gray-600 font-semibold ring-2 ring-white',
            sizes[size]
          )}
          aria-label={`${remainingCount} more users`}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
};

// AvatarGroup component uses Avatar from above
