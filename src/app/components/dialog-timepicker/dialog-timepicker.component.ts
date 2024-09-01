import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-timepicker',
  standalone: true,
  imports: [NgClass, NgIf, NgFor, MatButtonModule],
  templateUrl: './dialog-timepicker.component.html',
  styleUrl: './dialog-timepicker.component.scss',
  providers: [DatePipe],
})
export class DialogTimepickerComponent {
  private dialogRef = inject(MatDialogRef<DialogTimepickerComponent>);
  private dialogData = inject(MAT_DIALOG_DATA);
  private datePipe = inject(DatePipe);

  hoursList: any;
  minutesList: any;
  periodsList: any[] = [
    { id: 1, value: 'AM' },
    { id: 2, value: 'PM' },
  ];

  minuteHandTransform = 'rotate(0deg)';
  hourHandTransform = 'rotate(0deg)';
  selectedHour!: string;
  selectedMinute!: string;
  selectedPeriod!: string;

  isSelectingHours: boolean = true;

  ngOnInit(): void {
    this.mappingData();
    this.createHoursList();
    this.createMinutesList();
    this.updateClock();
  }

  mappingData(): void {
    const [time, period] = this.dialogData.time.split(' ');
    const [hour, minute] = time.split(':');
    this.selectedHour = hour.toString().padStart(2, '0');
    this.selectedMinute = minute.toString().padStart(2, '0');
    this.selectedPeriod = period;
  }

  createHoursList(): void {
    this.hoursList = Array.from({ length: 12 }, (_, i) => ({
      label: i + 1,
      transform: this.calculateTransform(i + 1, 12),
      disabled:
        this.dialogData.type === 'from'
          ? false
          : this.evaluateHoursDisabled(i + 1),
    }));
  }

  evaluateHoursDisabled(hour: number): boolean {
    const { minHour, periodAnotherClock, dateFrom, dateUntil } =
      this.dialogData;
    const dateFromFormatted = this.datePipe.transform(dateFrom, 'yyyy-MM-dd');
    const dateUntilFormatted = this.datePipe.transform(dateUntil, 'yyyy-MM-dd');

    if (dateFromFormatted !== dateUntilFormatted) return false;

    if (this.selectedPeriod === periodAnotherClock) {
      if (hour % 12 < Number(minHour) % 12) {
        return true;
      }
    }

    return false;
  }

  createMinutesList(): void {
    this.minutesList = Array.from({ length: 12 }, (_, i) => ({
      label: (i * 5).toString().padStart(2, '0'),
      transform: this.calculateTransform(i * 5, 60),
      disabled:
        this.dialogData.type === 'from'
          ? false
          : this.evaluateMinutesDisabled(i * 5),
    }));
  }

  evaluateMinutesDisabled(minute: number): boolean {
    const { minHour, minMinute, periodAnotherClock, dateFrom, dateUntil } =
      this.dialogData;
    const dateFromFormatted = this.datePipe.transform(dateFrom, 'yyyy-MM-dd');
    const dateUntilFormatted = this.datePipe.transform(dateUntil, 'yyyy-MM-dd');

    if (dateFromFormatted !== dateUntilFormatted) return false;

    if (
      this.selectedPeriod === periodAnotherClock &&
      Number(minHour) === Number(this.selectedHour)
    ) {
      if (Number(minMinute) > minute) return true;
    }

    return false;
  }

  updateClock() {
    const hourDegree = Number(this.selectedHour) * 30 - 90;
    const minuteDegree = Number(this.selectedMinute) * 6 - 90;
    this.hourHandTransform = `rotate(${hourDegree}deg)`;
    this.minuteHandTransform = `rotate(${minuteDegree}deg)`;
  }

  calculateTransform(value: number, totalUnits: number): string {
    const angle = value * (360 / totalUnits) - 90;
    const radius = 100;
    const x = radius * Math.cos((angle * Math.PI) / 180);
    const y = radius * Math.sin((angle * Math.PI) / 180);
    return `translate(${x}px, ${y}px) translate(-50%, -50%)`;
  }

  selectHour(hour: any) {
    if (hour.disabled) return;

    // if (this.data.type === 'until' && !this.isValidHourSelection(this.data, hour.label)) {
    //   return this.snackbarService.open('danger', Constants.SNACK_BAR_MSG.TRANSACTIONS.TIME_PICKER.HOUR_ERROR, 'center', 3000, 'warning', 'material');
    // }

    this.selectedHour = hour.label.toString().padStart(2, '0');
    this.isSelectingHours = false;
    this.createMinutesList();
    this.updateClock();
  }

  isValidHourSelection(dataDialog: any, hourSelection: string): boolean {
    const dateFrom = this.datePipe.transform(dataDialog.dateFrom, 'yyyy-MM-dd');
    const dateUntil = this.datePipe.transform(
      dataDialog.dateUntil,
      'yyyy-MM-dd'
    );

    if (dateFrom !== dateUntil) return true;

    if (dataDialog.periodAnotherClock === this.selectedPeriod) {
      if (Number(hourSelection) % 12 < Number(dataDialog.minHour) % 12)
        return false;
    }

    return true;
  }

  selectMinute(minute: any) {
    if (minute.disabled) return;

    // if (this.data.type === 'until' && !this.isValidMinuteSelection(this.data, minute.label)) {
    //   return this.snackbarService.open(
    //     'danger',
    //     Constants.SNACK_BAR_MSG.TRANSACTIONS.TIME_PICKER.MINUTE_ERROR,
    //     'center',
    //     3000,
    //     'warning',
    //     'material'
    //   );
    // }
    this.selectedMinute = minute.label;
    this.dialogRef.close(this.formattedTime);
  }

  isValidMinuteSelection(dataDialog: any, minuteSelected: string): boolean {
    const dateFrom = this.datePipe.transform(dataDialog.dateFrom, 'yyyy-MM-dd');
    const dateUntil = this.datePipe.transform(
      dataDialog.dateUntil,
      'yyyy-MM-dd'
    );

    if (dateFrom !== dateUntil) return true;

    if (dataDialog.periodAnotherClock === this.selectedPeriod) {
      if (Number(minuteSelected < dataDialog.minMinute)) return false;
    }

    return true;
  }

  selectPeriod(period: string) {
    this.selectedPeriod = period;
  }

  isMinuteMultipleOfFive(minute: string): boolean {
    const minuteNumber = Number(minute);
    return minuteNumber % 5 === 0;
  }

  closeDialog(): void {
    // if (this.dialogData.type === 'until' && !this.isValidPeriodSelection(this.data, this.selectedPeriod)) return;
    this.dialogRef.close(this.formattedTime);
  }

  get formattedTime() {
    const hour = this.selectedHour.toString().padStart(2, '0');
    const minute = this.selectedMinute.toString().padStart(2, '0');
    return `${hour}:${minute} ${this.selectedPeriod}`;
  }
}
