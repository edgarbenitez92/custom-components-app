import { NgClass, NgIf, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type CalendarView = 'days' | 'months' | 'years';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [NgIf, NgClass, NgFor, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {
  DAYS: string[] = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  MONTHS: string[] = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  date: Date = new Date();
  selectedDate: Date = new Date();
  view: CalendarView = 'days';
  inputValue: string = '';
  isOpen: boolean = false;

  minDate: Date = new Date(2021, 0, 1);
  maxDate: Date = new Date();

  ngOnInit() {
    this.inputValue = this.formatDate(this.selectedDate);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

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

  handleInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.inputValue = target.value;
    const parsedDate = this.parseDate(target.value);
    if (
      parsedDate &&
      parsedDate >= this.minDate &&
      parsedDate <= this.maxDate
    ) {
      this.selectedDate = parsedDate;
      this.date = parsedDate;
    }
  }

  handleInputFocus() {
    this.isOpen = true;
  }

  handleDateClick(day: number) {
    const newDate = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      day
    );
    if (newDate >= this.minDate && newDate <= this.maxDate) {
      this.selectedDate = newDate;
      this.inputValue = this.formatDate(this.selectedDate);
      this.isOpen = false;
    }
  }

  handleMonthClick(month: number) {
    this.date = new Date(this.date.getFullYear(), month, 1);
    this.setView('days');
  }

  handleYearClick(year: number) {
    this.date = new Date(year, this.date.getMonth(), 1);
    this.setView('months');
  }

  changeMonth(delta: number) {
    const newDate = new Date(
      this.date.getFullYear(),
      this.date.getMonth() + delta,
      1
    );
    if (newDate >= this.minDate && newDate <= this.maxDate) {
      this.date = newDate;
    }
  }

  changeYear(delta: number) {
    const newDate = new Date(
      this.date.getFullYear() + delta,
      this.date.getMonth(),
      1
    );
    if (newDate >= this.minDate && newDate <= this.maxDate) {
      this.date = newDate;
    }
  }

  renderDays() {
    const monthStart = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      1
    );
    const monthEnd = new Date(
      this.date.getFullYear(),
      this.date.getMonth() + 1,
      0
    );
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
      const isCurrentMonth = month === this.date.getMonth();
      const isDisabled =
        currentDate < this.minDate || currentDate > this.maxDate;
      const isSelected =
        this.selectedDate &&
        day === this.selectedDate.getDate() &&
        month === this.selectedDate.getMonth() &&
        year === this.selectedDate.getFullYear();

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

  renderMonths() {
    return this.MONTHS.map((month, index) => {
      const isDisabled =
        new Date(this.date.getFullYear(), index + 1, 0) < this.minDate ||
        new Date(this.date.getFullYear(), index, 1) > this.maxDate;
      const isSelected =
        index === this.date.getMonth() &&
        this.date.getFullYear() === this.selectedDate.getFullYear();
      return { month, isDisabled, isSelected, index };
    });
  }

  renderYears() {
    const currentYear = this.date.getFullYear();
    const years = [];
    for (let i = currentYear - 7; i <= currentYear + 8; i++) {
      const isDisabled =
        i < this.minDate.getFullYear() || i > this.maxDate.getFullYear();
      const isSelected = i === this.selectedDate.getFullYear();
      years.push({ year: i, isDisabled, isSelected });
    }
    return years;
  }

  canNavigateBack() {
    if (this.view === 'days') {
      return (
        new Date(this.date.getFullYear(), this.date.getMonth() - 1, 1) >=
        this.minDate
      );
    } else if (this.view === 'months') {
      return this.date.getFullYear() > this.minDate.getFullYear();
    } else {
      return this.date.getFullYear() - 7 > this.minDate.getFullYear();
    }
  }

  canNavigateForward() {
    if (this.view === 'days') {
      return (
        new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0) <=
        this.maxDate
      );
    } else if (this.view === 'months') {
      return this.date.getFullYear() < this.maxDate.getFullYear();
    } else {
      return this.date.getFullYear() + 8 < this.maxDate.getFullYear();
    }
  }
}
