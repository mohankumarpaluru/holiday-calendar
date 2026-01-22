export type HolidayType = 'general' | 'optional';

export interface Holiday {
  date: string;
  name: string;
  type: HolidayType;
}

export interface CityData {
  [city: string]: Holiday[];
}

export interface OrganizationData {
  [organization: string]: CityData;
}

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  holiday?: Holiday;
}

export type ViewMode = 'calendar' | 'list';
export type Theme = 'light' | 'dark';
