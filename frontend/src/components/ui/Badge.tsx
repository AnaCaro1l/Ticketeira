import React from 'react';
import { classNames } from 'primereact/utils';

interface BadgeProps {
  label: string;
  color?: 'blue' | 'red' | 'gray' | 'neon';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ label, color = 'blue', icon, className }) => {
  const colorClasses = {
    blue: 'bg-blue-200 text-blue-500 ',
    red: 'bg-red-300 text-red-500',
    gray: 'bg-gray-200 text-gray-500 ',
    neon: 'bg-purple-900/30 text-purple-300 border border-purple-500/50 shadow-[0_0_5px_rgba(168,85,247,0.3)]',
  };

  return (
    <span 
      className={classNames(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide',
        colorClasses[color],
        className
      )}
    >
      {icon && <span className="w-3 h-3 flex items-center justify-center">{icon}</span>}
      {label}
    </span>
  );
};