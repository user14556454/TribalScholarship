import React, { forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, required, className = '', id, ...props }, ref) => {
    const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        <label htmlFor={inputId} className="text-xs font-semibold text-[#0F172A] flex items-center gap-1">
          <span>{label}</span>
          {required && <span className="text-[#DC2626] font-bold">*</span>}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={`h-10 px-3 py-2 bg-white text-sm text-[#0F172A] border rounded placeholder:text-[#94A3B8] transition-colors outline-none focus:ring-2 focus:ring-[#0284C7] focus:border-[#0284C7] disabled:bg-[#F1F5F9] disabled:cursor-not-allowed ${
            error ? 'border-[#DC2626] focus:ring-[#DC2626] focus:border-[#DC2626]' : 'border-[#CBD5E1]'
          } ${className}`}
          {...props}
        />
        {error ? (
          <p className="text-xs text-[#DC2626] flex items-center gap-1 mt-0.5">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </p>
        ) : helperText ? (
          <p className="text-xs text-[#64748B] mt-0.5">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
