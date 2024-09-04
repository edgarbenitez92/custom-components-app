import { Injectable } from '@angular/core';
import {
  DaysView,
  MonthsView,
  YearsView,
} from '../shared/interfaces/Calendar.interface';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  daysArr: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  monthsArr: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  constructor() {}

  formatDate(date: Date): string {
    return `${date.getDate().toString().padStart(2, '0')}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}/${date.getFullYear()}`;
  }

  parseDate(dateString: string): Date | null {
    const parts = dateString.split('/');
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      return new Date(year, month, day);
    }
    return null;
  }

  renderDays(
    date: Date,
    minDate: Date,
    maxDate: Date,
    selectedDate: Date
  ): DaysView[] {
    const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
    const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const startDate = new Date(monthStart);
    startDate.setDate(startDate.getDate() - ((startDate.getDay() + 6) % 7));
    const endDate = new Date(monthEnd);
    endDate.setDate(endDate.getDate() + ((7 - endDate.getDay()) % 7));

    const days = [];
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const day = currentDate.getDate();
      const month = currentDate.getMonth();
      const year = currentDate.getFullYear();
      const isCurrentMonth = month === date.getMonth();
      const isDisabled = currentDate < minDate || currentDate > maxDate;
      const isSelected =
        selectedDate &&
        day === selectedDate.getDate() &&
        month === selectedDate.getMonth() &&
        year === selectedDate.getFullYear();

      days.push({
        day,
        isCurrentMonth,
        isDisabled,
        isSelected,
        date: new Date(currentDate),
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  }

  renderMonths(
    date: Date,
    minDate: Date,
    maxDate: Date,
    selectedDate: Date
  ): MonthsView[] {
    return this.monthsArr.map((month, index) => {
      const isDisabled =
        new Date(date.getFullYear(), index + 1, 0) < minDate ||
        new Date(date.getFullYear(), index, 1) > maxDate;
      const isSelected =
        index === date.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear();
      return { month, isDisabled, isSelected, index };
    });
  }

  renderYears(
    date: Date,
    minDate: Date,
    maxDate: Date,
    selectedDate: Date
  ): YearsView[] {
    const currentYear = date.getFullYear();
    const years = [];
    for (let i = currentYear - 7; i <= currentYear + 8; i++) {
      const isDisabled = i < minDate.getFullYear() || i > maxDate.getFullYear();
      const isSelected = i === selectedDate.getFullYear();
      years.push({ year: i, isDisabled, isSelected });
    }
    return years;
  }

  canNavigateBack(view: string, minDate: Date, date: Date): boolean {
    if (view === 'days') {
      return new Date(date.getFullYear(), date.getMonth() - 1, 1) >= minDate;
    }

    if (view === 'months') return date.getFullYear() > minDate.getFullYear();

    return date.getFullYear() - 7 > minDate.getFullYear();
  }

  canNavigateForward(view: string, maxDate: Date, date: Date): boolean {
    if (view === 'days') {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0) <= maxDate;
    }

    if (view === 'months') return date.getFullYear() < maxDate.getFullYear();

    return date.getFullYear() + 8 < maxDate.getFullYear();
  }
}
