import React from 'react';
import { Card as PrimeCard, type CardProps as PrimeCardProps } from 'primereact/card';
import { classNames } from 'primereact/utils';

interface CustomCardProps extends PrimeCardProps {
  hoverEffect?: boolean;
}

export const Card: React.FC<CustomCardProps> = ({ className, hoverEffect = false, ...props }) => {
  return (
    <PrimeCard
      className={classNames(
        'bg-white border border-gray-100 text-gray-800 rounded-xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.04)]',
        '[&>.p-card-body]:p-4 [&>.p-card-content]:py-0',
        hoverEffect && 'transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:border-gray-200 cursor-pointer',
        className
      )}
      {...props}
    />
  );
};