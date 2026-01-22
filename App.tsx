import React, { useState, useEffect, useMemo } from 'react';
import { HOLIDAY_DATA } from './constants';
import { ViewMode, Theme, Holiday } from './types';
import { DotPattern } from './components/DotPattern';
import { GlassNavbar } from './components/GlassNavbar';
import { MonthCalendar } from './components/MonthCalendar';
import { ListView } from './components/ListView';
import { Legend } from './components/Legend';
import { motion, AnimatePresence } from 'framer-motion';
import { getDayColor } from './utils/dateUtils';
import { isAfter, isToday, format } from 'date-fns';

const App: React.FC = () => {
  // --- State Initialization ---
  const [selectedOrg, setSelectedOrg] = useState<string>(() => Object.keys(HOLIDAY_DATA)[0]);
  const [selectedCity, setSelectedCity] = useState<string>(() => {
    const initialOrg = Object.keys(HOLIDAY_DATA)[0];
    return Object.keys(HOLIDAY_DATA[initialOrg] || {})[0] || '';
  });

  const [viewMode, setViewMode] = useState<ViewMode>('calendar');
  const [theme, setTheme] = useState<Theme>('light');

  // Persistence for Show Optional
  const [showOptional, setShowOptional] = useState<boolean>(() => {
    const saved = localStorage.getItem('holiday_show_optional');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('holiday_show_optional', JSON.stringify(showOptional));
  }, [showOptional]);

  // --- Derived State ---
  const organizations = Object.keys(HOLIDAY_DATA);
  const cities = useMemo(() => Object.keys(HOLIDAY_DATA[selectedOrg] || {}), [selectedOrg]);

  // Handle Organization Change
  const handleOrgChange = (newOrg: string) => {
    setSelectedOrg(newOrg);
    const newCities = Object.keys(HOLIDAY_DATA[newOrg] || {});
    // Strict Filter Hierarchy: Reset city to first available when Org changes
    if (newCities.length > 0) {
        setSelectedCity(newCities[0]);
    } else {
        setSelectedCity('');
    }
  };

  const currentHolidays = useMemo(() => {
    return HOLIDAY_DATA[selectedOrg]?.[selectedCity] || [];
  }, [selectedOrg, selectedCity]);

  // Helper for date parsing
  const parseDate = (dateStr: string) => {
    const [y, m, d] = dateStr.split('-').map(Number);
    return new Date(y, m - 1, d);
  };

  // Next Holiday Logic
  const { nextGeneral, nextOptional } = useMemo(() => {
    const today = new Date();
    // Sort all holidays
    const sorted = [...currentHolidays].sort((a, b) => a.date.localeCompare(b.date));
    const futureHolidays = sorted.filter(h => {
        const d = parseDate(h.date);
        return isAfter(d, today) || isToday(d);
    });

    // Find next General and Optional independently
    const nextGeneral = futureHolidays.find(h => h.type === 'general');
    const nextOptional = futureHolidays.find(h => h.type === 'optional');

    return { nextGeneral, nextOptional };
  }, [currentHolidays]);


  // --- Theme Management ---
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  // New Compact Next Holiday Row
  const NextHolidayItem = ({ holiday, isOptional = false }: { holiday: Holiday, isOptional?: boolean }) => {
    const dateObj = parseDate(holiday.date);

    return (
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 py-1.5 ${isOptional ? 'opacity-80' : ''}`}>
            <div className="flex items-center gap-2">
                {!isOptional && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />}
                <span className={`text-sm font-medium ${isOptional ? 'text-gray-600 dark:text-gray-300' : 'text-gray-900 dark:text-gray-100'}`}>
                    {holiday.name}
                </span>
            </div>

            <div className="flex items-center gap-3 pl-3.5 sm:pl-0">
                <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                    {format(dateObj, 'MMM d')} <span className="opacity-50 mx-1">·</span> {format(dateObj, 'EEE')}
                </span>
                {isOptional && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-500 border border-gray-200 dark:bg-white/10 dark:text-gray-400 dark:border-white/5 uppercase tracking-wide">
                        Optional
                    </span>
                )}
            </div>
        </div>
    );
  };

  // Determine which rows to show
  const showGeneralRow = !!nextGeneral;
  const showOptionalRow = showOptional && !!nextOptional && (nextOptional !== nextGeneral);

  return (
    <div className="relative min-h-screen w-full flex flex-col pt-24 pb-12 px-4 md:px-8 overflow-x-hidden">

      {/* Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <DotPattern
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
          className="fill-neutral-300 dark:fill-white/5"
        />
      </div>

      {/* CONTROLS ROW (Top Fixed) */}
      <GlassNavbar
        organizations={organizations}
        cities={cities}
        selectedOrg={selectedOrg}
        selectedCity={selectedCity}
        viewMode={viewMode}
        theme={theme}
        showOptional={showOptional}
        onOrgChange={handleOrgChange}
        onCityChange={setSelectedCity}
        onViewChange={setViewMode}
        onThemeChange={toggleTheme}
        onToggleOptional={() => setShowOptional(!showOptional)}
      />

      {/* Main Content */}
      <main className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col items-center">

        {/* NEW HEADER LAYOUT */}
        <div className="w-full flex flex-col gap-6">

            {/* Layer 1: Context + Right Zone (Next Holiday Card) */}
            <div className="flex flex-col lg:flex-row justify-between items-start gap-8">

                {/* Left Zone: Context + Legend */}
                <div className="flex flex-col gap-3 max-w-2xl shrink-0">
                   <motion.h1
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-50 tracking-tight"
                   >
                      {selectedOrg} Holidays — {selectedCity}
                   </motion.h1>
                   <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed"
                   >
                      Data is based on early 2026 information and may change. Found an issue?{' '}
                      <a
                        href="https://github.com/mohankumarpaluru/holiday-calendar/issues/new"
                        className="text-gray-600 dark:text-gray-300 underline decoration-gray-300 dark:decoration-gray-600 underline-offset-2 hover:text-gray-900 dark:hover:text-white transition-colors"
                      >
                        Open one on GitHub.
                      </a>
                   </motion.p>

                   {/* Legend Moved Here */}
                   <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mt-2"
                    >
                        <Legend />
                    </motion.div>
                </div>

                {/* Right Zone: Next Holiday Card */}
                <div className="flex flex-col gap-3 w-full lg:w-auto items-start lg:items-end">

                    {/* Next Holiday Card */}
                    <motion.div
                       initial={{ opacity: 0, scale: 0.98 }}
                       animate={{ opacity: 1, scale: 1 }}
                       transition={{ delay: 0.15 }}
                       className="w-full lg:w-auto min-w-[320px]"
                    >
                        <div className="bg-white/80 dark:bg-[#0A101D]/80 backdrop-blur-md rounded-xl border border-gray-200/60 dark:border-white/10 shadow-sm p-5">
                            <div className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500 font-semibold mb-3">
                                Next Holiday
                            </div>

                            {(showGeneralRow || showOptionalRow) ? (
                                <div className="flex flex-col gap-1">
                                    {showGeneralRow && (
                                        <NextHolidayItem holiday={nextGeneral} />
                                    )}
                                    {showGeneralRow && showOptionalRow && <div className="h-px w-full bg-gray-100 dark:bg-white/5 my-1" />}
                                    {showOptionalRow && (
                                        <NextHolidayItem holiday={nextOptional} isOptional={true} />
                                    )}
                                </div>
                            ) : (
                                 <div className="text-sm text-gray-400 italic py-1">
                                    No upcoming holidays found.
                                 </div>
                            )}
                        </div>
                    </motion.div>
                </div>

            </div>

        </div>

        {/* Separator: Left to Right Fade */}
        <motion.div
           initial={{ opacity: 0, scaleX: 0 }}
           animate={{ opacity: 1, scaleX: 1 }}
           transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
           style={{ transformOrigin: 'left' }}
           className="w-full h-px bg-gradient-to-r from-gray-200 via-gray-100/50 to-transparent dark:from-white/15 dark:via-white/5 dark:to-transparent my-10"
           aria-hidden="true"
        />

        {/* View Transition */}
        <AnimatePresence mode="wait">
          {viewMode === 'calendar' ? (
            <motion.div
              key="calendar-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 w-full justify-items-center"
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <MonthCalendar
                  key={i}
                  year={2026}
                  monthIndex={i}
                  holidays={currentHolidays}
                  showOptional={showOptional}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              <ListView holidays={currentHolidays} showOptional={showOptional} />
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="mt-auto pt-20 pb-8 text-center text-xs text-slate-400 dark:text-slate-600 uppercase tracking-widest">
          <p>© 2026 Holiday Calendar, MKP</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
