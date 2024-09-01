import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  HourData,
  MinuteData,
  PeriodData,
} from '../../shared/interfaces/Time.interface';

@Component({
  selector: 'app-single-timepicker',
  standalone: true,
  imports: [NgClass, NgIf, NgFor, MatButtonModule],
  templateUrl: './single-timepicker.component.html',
  styleUrl: './single-timepicker.component.scss',
  providers: [DatePipe],
})
export class SingleTimepickerComponent {
  private dialogRef = inject(MatDialogRef<SingleTimepickerComponent>);
  private dialogData: SingleTimePickerData = inject(MAT_DIALOG_DATA);

  hoursList: HourData[] = [];
  minutesList: MinuteData[] = [];
  periodsList: PeriodData[] = [
    { id: 1, label: 'AM' },
    { id: 2, label: 'PM' },
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
      id: i + 1,
      label: (i + 1).toString(),
      transform: this.calculateTransform(i + 1, 12),
    }));
  }

  createMinutesList(): void {
    this.minutesList = Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      label: (i * 5).toString().padStart(2, '0'),
      transform: this.calculateTransform(i * 5, 60),
    }));
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
    this.selectedHour = hour.label.toString().padStart(2, '0');
    this.isSelectingHours = false;
    this.createMinutesList();
    this.updateClock();
  }

  selectMinute(minute: any) {
    this.selectedMinute = minute.label;
    this.dialogRef.close(this.formattedTime);
  }

  selectPeriod(period: string) {
    this.selectedPeriod = period;
  }

  isMinuteMultipleOfFive(minute: string): boolean {
    const minuteNumber = Number(minute);
    return minuteNumber % 5 === 0;
  }

  closeDialog(): void {
    this.dialogRef.close(this.formattedTime);
  }

  get formattedTime() {
    const hour = this.selectedHour.toString().padStart(2, '0');
    const minute = this.selectedMinute.toString().padStart(2, '0');
    return `${hour}:${minute} ${this.selectedPeriod}`;
  }
}

interface SingleTimePickerData {
  time: string;
}
