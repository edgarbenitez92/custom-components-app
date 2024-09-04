import { NgClass, NgIf, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarService } from '../../services/calendar.service';
import {
  CalendarView,
  DaysView,
  MonthsView,
  YearsView,
} from '../../shared/interfaces/Calendar.interface';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [NgIf, NgClass, NgFor, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {
  private calendarService = inject(CalendarService);

  monthsList: string[];
  daysList: string[];

  date: Date = new Date();
  selectedDate: Date = new Date();
  view: CalendarView = 'days';
  inputValue: string = '';
  isOpen: boolean = false;

  minDate: Date = new Date(2021, 0, 1);
  maxDate: Date = new Date();

  constructor() {
    this.daysList = this.calendarService.daysArr;
    this.monthsList = this.calendarService.monthsArr;
  }

  ngOnInit() {
    this.inputValue = this.calendarService.formatDate(this.selectedDate);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  handleInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.inputValue = target.value;
    const parsedDate = this.calendarService.parseDate(target.value);

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
      this.inputValue = this.calendarService.formatDate(this.selectedDate);
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

  renderDays(
    date: Date,
    minDate: Date,
    maxDate: Date,
    selectedDate: Date
  ): DaysView[] {
    return this.calendarService.renderDays(
      date,
      minDate,
      maxDate,
      selectedDate
    );
  }

  renderMonths(
    date: Date,
    minDate: Date,
    maxDate: Date,
    selectedDate: Date
  ): MonthsView[] {
    return this.calendarService.renderMonths(
      date,
      minDate,
      maxDate,
      selectedDate
    );
  }

  renderYears(
    date: Date,
    minDate: Date,
    maxDate: Date,
    selectedDate: Date
  ): YearsView[] {
    return this.calendarService.renderYears(
      date,
      minDate,
      maxDate,
      selectedDate
    );
  }

  canNavigateBack(view: string, minDate: Date, date: Date): boolean {
    return this.calendarService.canNavigateBack(view, minDate, date);
  }

  canNavigateForward(view: string, maxDate: Date, date: Date): boolean {
    return this.calendarService.canNavigateForward(view, maxDate, date);
  }
}
