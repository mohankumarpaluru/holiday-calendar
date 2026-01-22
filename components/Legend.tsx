import React from 'react';
import { COLORS } from '../constants';

export const Legend: React.FC = () => {
  const items = [
    COLORS.LONG_WEEKEND,
    COLORS.MAGIC_1_FOR_4,
    COLORS.MIDWEEK_BREAK
  ];

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2" aria-label="Holiday type legend">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2 group cursor-default">
          <div 
            className={`w-2.5 h-2.5 rounded-full ${item.dot} ring-1 ring-inset ring-black/5 dark:ring-white/30`} 
            aria-hidden="true" 
          />
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300 leading-none">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};