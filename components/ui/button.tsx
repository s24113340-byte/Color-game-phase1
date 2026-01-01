import React from 'react';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'ghost' | 'outline' | 'default';
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ size = 'md', variant = 'default', className = '', children, ...props }, ref) => {
    const sizeClass = size === 'sm' ? 'px-2 py-1 text-sm' : size === 'lg' ? 'px-6 py-3 text-lg' : 'px-4 py-2';
    const variantClass = variant === 'ghost' ? 'bg-transparent' : variant === 'outline' ? 'bg-transparent border' : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white';

    return (
      <button
        ref={ref}
        className={`${sizeClass} ${variantClass} rounded-lg ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
