import React from 'react';
import { cn } from '../../utils/helpers';
import { ChevronDown } from 'lucide-react';

// ============================================
// Select Component
// ============================================

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, options, error, helperText, placeholder, onChange, id, required, ...props }, ref) => {
    const selectId = id || `select-${label?.toLowerCase().replace(/\s+/g, '-')}`;

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange?.(e.target.value);
    };

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="block text-sm font-medium text-gray-700 mb-2">
            {label}
            {required && <span className="text-primary ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              'w-full px-4 py-3 rounded-xl border bg-white appearance-none transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
              'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
              error
                ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
                : 'border-gray-200 hover:border-gray-300',
              'pr-10',
              className
            )}
            onChange={handleChange}
            aria-invalid={error ? 'true' : 'false'}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="mt-2 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

// ============================================
// Radio Group Component
// ============================================

interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

interface RadioGroupProps {
  label?: string;
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  direction?: 'horizontal' | 'vertical';
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  name,
  options,
  value,
  onChange,
  error,
  direction = 'vertical',
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {label}
        </label>
      )}
      <div
        className={cn(
          'flex gap-4',
          direction === 'horizontal' ? 'flex-row flex-wrap' : 'flex-col'
        )}
        role="radiogroup"
        aria-label={label}
      >
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              'flex items-start cursor-pointer p-3 rounded-xl border-2 transition-all duration-200',
              value === option.value
                ? 'border-primary bg-red-50'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            )}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="sr-only"
            />
            <span
              className={cn(
                'w-5 h-5 rounded-full border-2 mr-3 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all',
                value === option.value
                  ? 'border-primary bg-primary'
                  : 'border-gray-300'
              )}
            >
              {value === option.value && (
                <span className="w-2 h-2 rounded-full bg-white" />
              )}
            </span>
            <div>
              <span className="font-medium text-gray-900">{option.label}</span>
              {option.description && (
                <p className="text-sm text-gray-500 mt-1">{option.description}</p>
              )}
            </div>
          </label>
        ))}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};
