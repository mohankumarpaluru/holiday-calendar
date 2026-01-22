import { Holiday } from '../types';
import { COLORS } from '../constants';

export const getDayColor = (date: Date, holiday?: Holiday) => {
  if (!holiday) return null;

  const dayOfWeek = date.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat

  // Monday (1) or Friday (5) -> Long Weekend
  if (dayOfWeek === 1 || dayOfWeek === 5) {
    return COLORS.LONG_WEEKEND;
  }
  // Tuesday (2) or Thursday (4) -> Magic 1 for 4
  if (dayOfWeek === 2 || dayOfWeek === 4) {
    return COLORS.MAGIC_1_FOR_4;
  }
  // Wednesday (3) -> Midweek Break
  if (dayOfWeek === 3) {
    return COLORS.MIDWEEK_BREAK;
  }
  
  return COLORS.DEFAULT;
};

export const getMonthDays = (year: number, month: number) => {
  const date = new Date(year, month, 1);
  const days: Date[] = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

// Pad start of month with empty days for grid alignment
export const getPaddedMonthDays = (year: number, month: number) => {
  const days = getMonthDays(year, month);
  if (days.length === 0) return [];

  const startDay = days[0].getDay(); // 0 Sun ... 6 Sat
  // We want Week start on Monday.
  // Standard: Sun(0), Mon(1)...Sat(6)
  // Target: Mon(0), Tue(1)...Sun(6)
  
  // Mapping standard getDay to Mon-start index:
  // 0(Sun) -> 6
  // 1(Mon) -> 0
  // 2(Tue) -> 1
  // ...
  const offset = startDay === 0 ? 6 : startDay - 1;
  
  const padding = Array(offset).fill(null);
  return [...padding, ...days];
};