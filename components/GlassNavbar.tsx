import React from 'react';
import { Moon, Sun, Github, Calendar, List } from 'lucide-react';
import { Select } from './ui/Select';

interface GlassNavbarProps {
  organizations: string[];
  cities: string[];
  selectedOrg: string;
  selectedCity: string;
  viewMode: 'calendar' | 'list';
  theme: 'light' | 'dark';
  showOptional: boolean;
  onOrgChange: (val: string) => void;
  onCityChange: (val: string) => void;
  onViewChange: (val: 'calendar' | 'list') => void;
  onThemeChange: () => void;
  onToggleOptional: () => void;
}

export const GlassNavbar: React.FC<GlassNavbarProps> = ({
  organizations,
  cities,
  selectedOrg,
  selectedCity,
  viewMode,
  theme,
  showOptional,
  onOrgChange,
  onCityChange,
  onViewChange,
  onThemeChange,
  onToggleOptional
}) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none p-4" aria-label="Main Controls">
      <div
        className="pointer-events-auto flex flex-col md:flex-row items-center justify-between gap-4 p-2 md:pl-4 md:pr-2 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-5xl ring-1 ring-black/5 dark:ring-white/5"
        style={{
            backgroundColor: theme === 'dark' ? '#071024cc' : 'rgba(255,255,255,0.92)'
        }}
      >

        {/* LEFT: Filters */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 w-full md:w-auto">
             {/* Year Indicator */}
            <div className="flex items-center justify-center h-10 px-3 rounded-lg bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 text-sm font-bold text-gray-800 dark:text-gray-100 whitespace-nowrap">
              2026
            </div>

            <Select
                value={selectedOrg}
                onChange={(e) => onOrgChange(e.target.value)}
                className="w-full md:w-40 h-10"
                aria-label="Select Organization"
            >
            {organizations.map(org => <option key={org} value={org}>{org}</option>)}
            </Select>

            <Select
                value={selectedCity}
                onChange={(e) => onCityChange(e.target.value)}
                className="w-full md:w-40 h-10"
                aria-label="Select City"
            >
            {cities.map(city => <option key={city} value={city}>{city}</option>)}
            </Select>
        </div>

        {/* RIGHT: Actions */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 w-full md:w-auto">

            {/* View Toggle */}
            <div className="flex bg-gray-100 dark:bg-transparent dark:border dark:border-zinc-700 p-1 rounded-lg">
                <button
                    onClick={() => onViewChange('calendar')}
                    className={`flex items-center gap-2 px-3 h-8 rounded-md text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-slate-400 ${
                        viewMode === 'calendar'
                        ? 'bg-slate-900 text-white shadow-sm dark:bg-slate-700 dark:text-white'
                        : 'text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-white bg-transparent'
                    }`}
                    aria-pressed={viewMode === 'calendar'}
                    aria-label="Calendar View"
                >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Calendar</span>
                </button>
                <div className="w-px h-4 bg-gray-300 dark:bg-zinc-700 self-center mx-0.5" />
                <button
                    onClick={() => onViewChange('list')}
                    className={`flex items-center gap-2 px-3 h-8 rounded-md text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-slate-400 ${
                        viewMode === 'list'
                        ? 'bg-slate-900 text-white shadow-sm dark:bg-slate-700 dark:text-white'
                        : 'text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-white bg-transparent'
                    }`}
                    aria-pressed={viewMode === 'list'}
                    aria-label="List View"
                >
                    <List className="w-3.5 h-3.5" />
                    <span>List</span>
                </button>
            </div>

            {/* Separator */}
            <div className="w-px h-6 bg-gray-200 dark:bg-zinc-700 mx-1 hidden sm:block" />

            {/* Optional Toggle */}
            <button
                onClick={onToggleOptional}
                className={`hidden sm:flex items-center px-4 h-10 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-slate-400 active:scale-[0.98] ${
                    showOptional
                    ? 'bg-slate-800 text-white shadow-sm dark:bg-slate-700'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800'
                }`}
                aria-pressed={showOptional}
            >
                {showOptional ? 'Hide optional holidays' : 'Show optional holidays'}
            </button>

             {/* Mobile only icon toggle for space */}
             <button
                onClick={onToggleOptional}
                className={`flex sm:hidden items-center justify-center w-10 h-10 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-slate-400 ${
                    showOptional
                    ? 'bg-slate-800 text-white shadow-sm dark:bg-slate-700'
                    : 'bg-white border border-gray-300 text-gray-700 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-300'
                }`}
                aria-label={showOptional ? 'Hide optional holidays' : 'Show optional holidays'}
            >
                <span className="text-xs font-bold">{showOptional ? 'OPT' : 'GEN'}</span>
            </button>

            {/* Theme Toggle */}
            <button
                onClick={onThemeChange}
                className="flex items-center justify-center w-10 h-10 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
                aria-label="Toggle theme"
            >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {/* Github Link */}
            <a
                href="https://github.com/mohankumarpaluru/holiday-calendar"
                className="flex items-center justify-center w-10 h-10 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View on GitHub"
            >
                <Github className="w-5 h-5" />
            </a>

        </div>
      </div>
    </nav>
  );
};
