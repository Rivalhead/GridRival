import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  label: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const IconButton = React.memo(function IconButton({
  icon: Icon,
  label,
  variant = 'ghost',
  size = 'md',
  className = '',
  ...props
}: IconButtonProps) {
  const baseStyles = 'rounded-lg transition-colors';
  
  const variantStyles = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-700 hover:bg-gray-600 text-gray-200',
    ghost: 'hover:bg-gray-700/50 text-gray-400 hover:text-gray-200'
  };
  
  const sizeStyles = {
    sm: 'p-1',
    md: 'p-2',
    lg: 'p-3'
  };
  
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      aria-label={label}
      {...props}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
});