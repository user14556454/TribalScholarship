import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'destructive' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none rounded';

  const sizeStyles = {
    sm: 'h-8 px-3 text-xs gap-1.5',
    md: 'h-10 px-4 text-sm gap-2',
    lg: 'h-12 px-6 text-base gap-2.5'
  }[size];

  const variantStyles = {
    primary: 'bg-[#0284C7] hover:bg-[#0369A1] text-white shadow-xs active:bg-[#075985]',
    secondary: 'bg-white hover:bg-[#F1F5F9] text-[#0F172A] border border-[#CBD5E1] shadow-2xs active:bg-[#E2E8F0]',
    outline: 'bg-transparent hover:bg-[#F0F9FF] text-[#0284C7] border border-[#0284C7]',
    destructive: 'bg-[#DC2626] hover:bg-[#B91C1C] text-white shadow-xs active:bg-[#991B1B]',
    ghost: 'bg-transparent hover:bg-[#F1F5F9] text-[#0284C7] active:bg-[#E2E8F0]'
  }[variant];

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        leftIcon
      )}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </button>
  );
};
