import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  href?: string;
  children: ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  href,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium tracking-luxury uppercase text-xs transition-all duration-300 select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'px-4 py-2 text-[10px]',
    md: 'px-7 py-3.5 text-[11px]',
    lg: 'px-9 py-4 text-xs',
  };

  const variantStyles = {
    primary: 'bg-[#FF3B8A] text-white hover:bg-[#FF1A75] active:bg-[#E0005C] border border-[#FF3B8A] shadow-[0_4px_16px_rgba(255,59,138,0.25)]',
    secondary: 'bg-[#18181E] text-white hover:bg-[#252530] hover:text-[#FF5DA2] active:bg-[#2D2D3A] border border-[#2E2E3A]',
    outline: 'bg-transparent text-white border border-[#FF3B8A] hover:bg-[#FF3B8A] hover:text-white',
    ghost: 'bg-transparent text-neutral-300 hover:text-[#FF5DA2] hover:bg-white/5 border border-transparent',
    gold: 'bg-gradient-to-r from-[#FF5DA2] to-[#FF3B8A] text-white hover:opacity-95 border border-[#FF5DA2]',
  };

  const widthStyle = fullWidth ? 'w-full' : '';
  const combinedClassName = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span>Loading...</span>
          </span>
        ) : (
          children
        )}
      </Link>
    );
  }

  return (
    <button
      disabled={disabled || isLoading}
      className={combinedClassName}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Processing...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}
