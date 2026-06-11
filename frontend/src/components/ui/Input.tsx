import React from 'react';
import { InputText, type InputTextProps } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';

interface InputProps extends InputTextProps {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className, id, ...props }) => {
  const inputId = id || `input-${Math.random().toString(36).substring(2, 11)}`;

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <InputText
        id={inputId}
        className={classNames(
          'p-3 rounded-xl bg-gray-50 border text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#0b3296]/20 outline-none transition-all',
          error ? 'border-red-500' : 'border-gray-200 focus:border-[#0b3296]',
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  );
};