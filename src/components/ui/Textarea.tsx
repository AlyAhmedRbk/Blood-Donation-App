import React from 'react';
import { cn } from '../../utils/helpers';

// ============================================
// Textarea Component
// ============================================

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  maxLength?: number;
  showCount?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, maxLength, showCount = false, id, value, ...props }, ref) => {
    const textareaId = id || `textarea-${label?.toLowerCase().replace(/\s+/g, '-')}`;
    const charCount = typeof value === 'string' ? value.length : 0;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-medium text-gray-700 mb-2">
            {label}
            {props.required && <span className="text-primary ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          value={value}
          maxLength={maxLength}
          className={cn(
            'w-full px-4 py-3 rounded-xl border bg-white resize-none transition-all duration-200',
            'placeholder:text-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
            'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
            error
              ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
              : 'border-gray-200 hover:border-gray-300',
            'min-h-[120px]',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error
              ? `${textareaId}-error`
              : helperText
                ? `${textareaId}-helper`
                : undefined
          }
          {...props}
        />
        {(showCount || maxLength) && (
          <div className="mt-1 flex justify-end">
            <span
              className={cn(
                'text-xs',
                maxLength && charCount > maxLength * 0.9
                  ? 'text-orange-500'
                  : 'text-gray-400'
              )}
            >
              {charCount}{maxLength ? ` / ${maxLength}` : ''}
            </span>
          </div>
        )}
        {error && (
          <p id={`${textareaId}-error`} className="mt-2 text-sm text-red-600 flex items-center gap-1">
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
          <p id={`${textareaId}-helper`} className="mt-2 text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
