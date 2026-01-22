import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export const Select: React.FC<SelectProps> = ({ className, children, ...props }) => {
  return (
    <div className="relative group">
      <select
        className={`appearance-none w-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 py-2 pl-3 pr-8 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-500 transition-all hover:bg-white/70 dark:hover:bg-slate-800/70 cursor-pointer ${className}`}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors" />
    </div>
  );
};
