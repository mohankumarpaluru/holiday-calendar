import React, { useMemo } from 'react';
import { format, isToday, isSameMonth, isWeekend, getDay } from 'date-fns';
import { Holiday } from '../types';
import { getPaddedMonthDays } from '../utils/dateUtils';
import { ShineBorder } from './ui/shine-border';
import { BorderBeam } from './ui/border-beam';

interface MonthCalendarProps {
  year: number;
  monthIndex: number;
  holidays: Holiday[];
  showOptional: boolean;
}

// Fixed 3-letter headers
const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const MonthCalendar: React.FC<MonthCalendarProps> = ({ year, monthIndex, holidays, showOptional }) => {
  const days = useMemo(() => getPaddedMonthDays(year, monthIndex), [year, monthIndex]);
  const monthDate = new Date(year, monthIndex);
  const monthName = format(monthDate, 'MMMM');
  const isCurrentMonthRealTime = isSameMonth(new Date(), monthDate);

  // -- Holiday Highlight Logic --
  const getDayStyles = (date: Date, holiday?: Holiday) => {
    if (!holiday) return null;
    const day = getDay(date); // 0=Sun, 1=Mon...

    // Mon(1) or Fri(5) -> Long Weekend (Green)
    if (day === 1 || day === 5) {
      return "bg-emerald-100 text-emerald-900 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-100 dark:border-emerald-800";
    }
    // Tue(2) or Thu(4) -> Magic 1 for 4 (Blue)
    if (day === 2 || day === 4) {
      return "bg-sky-100 text-sky-900 border-sky-200 dark:bg-sky-900/40 dark:text-sky-100 dark:border-sky-800";
    }
    // Wed(3) -> Midweek Break (Amber)
    if (day === 3) {
      return "bg-amber-100 text-amber-900 border-amber-200 dark:bg-amber-900/40 dark:text-amber-100 dark:border-amber-800";
    }
    // Default
    return "bg-purple-100 text-purple-900 border-purple-200 dark:bg-purple-900/40 dark:text-purple-100 dark:border-purple-800";
  };

  // The content inside a card (Headers + Grid)
  const CalendarContent = (
    <div className="flex flex-col h-full w-full p-6">
      <h3 className="text-xl font-semibold text-center mb-4 text-neutral-900 dark:text-neutral-100 tracking-tight">
        {monthName}
      </h3>

      <div className="grid grid-cols-7 mb-2">
        {WEEK_DAYS.map((day) => (
          <div key={day} className="text-center text-xs font-regular uppercase tracking-widest text-secondary opacity-70">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1 gap-x-1 auto-rows-fr flex-grow">
        {days.map((date, idx) => {
          if (!date) return <div key={`empty-${idx}`} />;

          const dateString = format(date, 'yyyy-MM-dd');
          const holiday = holidays.find(h => h.date === dateString);
          const visibleHoliday = holiday && (showOptional || holiday.type === 'general') ? holiday : undefined;

          const highlightClass = visibleHoliday ? getDayStyles(date, visibleHoliday) : null;
          const isWknd = isWeekend(date);
          const isTdy = isToday(date);

          // Base styling - Redesigned for lighter look (fixed size centered)
          const baseClasses = `
            w-8 h-8 mx-auto flex flex-col items-center justify-center rounded-md text-sm font-medium transition-colors relative
            ${highlightClass ? `${highlightClass} border` : ''}
            ${!highlightClass && isWknd ? 'text-neutral-400 dark:text-neutral-600' : ''}
            ${!highlightClass && !isWknd ? 'text-neutral-900 dark:text-neutral-200' : ''}
            ${!highlightClass && !isTdy && !isWknd ? 'hover:bg-neutral-100 dark:hover:bg-neutral-800/50' : ''}
          `;

          const content = (
            <div className={baseClasses}>
              <span className={isTdy && !highlightClass ? "font-bold" : ""}>{format(date, 'd')}</span>
              {visibleHoliday && visibleHoliday.type === 'optional' && (
                <div className="w-1 h-1 rounded-full bg-current opacity-60 mt-0.5" />
              )}
            </div>
          );

          // Special: Today gets its own mini ShineBorder
          if (isTdy) {
            return (
              <div key={dateString} className="relative w-full h-10 flex items-center justify-center">
                <ShineBorder
                  borderRadius={6} // match rounded-md
                  borderWidth={1.2}
                  duration={12}
                  className="w-8 h-8"
                >
                  {content}
                </ShineBorder>
              </div>
            );
          }

          return (
            <div key={dateString} className="relative w-full h-10 flex items-center justify-center group cursor-default">
              {content}
              {visibleHoliday && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block z-50">
                   <div className="bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap pointer-events-none">
                     {visibleHoliday.name}
                   </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  // --- Wrapper Structure ---

  // 1. Current Month: Use ShineBorder wrapper (Border only, moving)
  if (isCurrentMonthRealTime) {
    return (
      <div className="w-full max-w-[340px]">
        <ShineBorder
          className="w-full h-full shadow-sm"
          borderRadius={12}
          borderWidth={1.2}
          duration={14}
        >
            {/* Inner Content is wrapped by ShineBorder's .card-content div automatically */}
            {CalendarContent}
        </ShineBorder>
      </div>
    );
  }

  // 2. Standard Month: Use BorderBeam (Ambient, behind)
  return (
    <div className="w-full max-w-[340px] relative">
         {/* Beam sits behind via z-0 in CSS, card-content sits above via z-10 */}
        <BorderBeam className="z-0" />
        <div className="card-content rounded-xl border border-neutral-200/50 dark:border-white/5 h-full">
            {CalendarContent}
        </div>
    </div>
  );
};
