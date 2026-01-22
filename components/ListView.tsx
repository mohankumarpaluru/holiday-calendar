import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Holiday } from '../types';
import { getDayColor } from '../utils/dateUtils';
import { Calendar as CalendarIcon } from 'lucide-react';

interface ListViewProps {
  holidays: Holiday[];
  showOptional: boolean;
}

export const ListView: React.FC<ListViewProps> = ({ holidays, showOptional }) => {
  // Filter and Sort
  const filteredHolidays = holidays
    .filter(h => showOptional || h.type === 'general')
    .sort((a, b) => a.date.localeCompare(b.date));

  if (filteredHolidays.length === 0) {
    return (
      <div className="w-full max-w-5xl mx-auto pb-20">
         <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-8 text-center text-gray-500">
            No holidays found for this selection.
         </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto pb-20">
        <div className="rounded-xl bg-white dark:bg-[#0f1724]/60 backdrop-blur-sm border border-neutral-200 dark:border-white/10 shadow-sm p-6 md:p-8">
            {/* Desktop Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 border-b border-neutral-100 dark:border-white/10 text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-4">
                <div className="col-span-3">Date</div>
                <div className="col-span-2">Day</div>
                <div className="col-span-5">Holiday Name</div>
                <div className="col-span-2 text-right">Type</div>
            </div>

            <div className="space-y-2">
                {filteredHolidays.map((holiday, idx) => {
                const [y, m, d] = holiday.date.split('-').map(Number);
                const dateObj = new Date(y, m - 1, d);
                
                const styles = getDayColor(dateObj, holiday);

                return (
                    <motion.div
                    key={`${holiday.date}-${holiday.name}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className={`
                        group relative overflow-hidden
                        grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 p-4 rounded-lg
                        border hover:border-transparent transition-all duration-200
                        ${styles ? styles.border : 'border-neutral-100 dark:border-white/5'}
                        hover:bg-neutral-50 dark:hover:bg-white/5
                    `}
                    >
                        {/* Background Tint on Hover */}
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 ${styles ? styles.bg.split(' ')[0].replace('bg-', 'bg-') : 'bg-gray-200'}`} />

                        {/* Date */}
                        <div className="col-span-1 md:col-span-3 flex items-center gap-2 font-medium text-neutral-900 dark:text-neutral-100">
                            <CalendarIcon className="w-4 h-4 text-neutral-400" />
                            {format(dateObj, 'MMMM d, yyyy')}
                        </div>

                        {/* Day */}
                        <div className="col-span-1 md:col-span-2 flex items-center text-neutral-500 dark:text-neutral-400">
                            {format(dateObj, 'EEEE')}
                        </div>

                        {/* Name */}
                        <div className={`col-span-1 md:col-span-5 font-semibold text-base ${styles ? styles.text : 'text-neutral-800 dark:text-neutral-200'}`}>
                            {holiday.name}
                        </div>

                        {/* Type */}
                        <div className="col-span-1 md:col-span-2 flex items-center md:justify-end">
                            <span className={`
                                inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border
                                ${holiday.type === 'general' 
                                    ? 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800' 
                                    : 'bg-neutral-100 text-neutral-600 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-700'}
                            `}>
                                {holiday.type === 'general' ? 'General' : 'Optional'}
                            </span>
                        </div>
                    </motion.div>
                );
                })}
            </div>
        </div>
    </div>
  );
};