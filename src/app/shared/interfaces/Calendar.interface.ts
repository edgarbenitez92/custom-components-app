export interface DaysView {
  day: number;
  isCurrentMonth: boolean;
  isDisabled: boolean;
  isSelected: boolean;
  date: Date;
}

export interface MonthsView {
  month: string;
  isDisabled: boolean;
  isSelected: boolean;
  index: number;
}

export interface YearsView {
  year: number;
  isDisabled: boolean;
  isSelected: boolean;
}

export type CalendarView = 'days' | 'months' | 'years';
