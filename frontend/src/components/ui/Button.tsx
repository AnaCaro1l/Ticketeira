import React from 'react';
import { Button as PrimeButton, type ButtonProps as PrimeButtonProps } from 'primereact/button';
import { classNames } from 'primereact/utils';

interface ButtonProps extends PrimeButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'light';
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className, ...props }) => {
  const variantClasses = {
    primary: 'bg-[#0b3296] hover:bg-[#082570] text-white border-transparent shadow-sm', // Azul escuro UniTick
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-800 border-transparent',
    outline: 'bg-transparent border-[#0b3296] text-[#0b3296] hover:bg-blue-50',
    light: 'bg-white border border-gray-200 text-[#0b3296] hover:bg-gray-200',
  };

  return (
    <PrimeButton
      className={classNames(
        'font-semibold rounded-lg px-4 py-2 transition-colors',
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
};