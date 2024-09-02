import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  HourData,
  MinuteData,
  PeriodData,
} from '../../shared/interfaces/Time.interface';

@Component({
  selector: 'app-full-timepicker',
  standalone: true,
  imports: [NgClass, NgIf, NgFor, MatButtonModule],
  templateUrl: './full-timepicker.component.html',
  styleUrl: './full-timepicker.component.scss',
})
export class FullTimepickerComponent {
  private dialogRef = inject(MatDialogRef<FullTimepickerComponent>);
  private dialogData: any = inject(MAT_DIALOG_DATA);

  @ViewChild('clock', { static: true }) clock!: ElementRef<HTMLDivElement>;

  hoursList: HourData[] = [];
  minutesList: MinuteData[] = [];
  periodsList: PeriodData[] = [
    { id: 1, label: 'AM' },
    { id: 2, label: 'PM' },
  ];

  minuteHandTransform = 'rotate(0deg)';
  hourHandTransform = 'rotate(0deg)';
  selectedHour!: string;
  displayedHour!: string;
  selectedMinute!: string;

  isSelectingHours: boolean = true;
  isDragging: boolean = false;

  ngOnInit(): void {
    this.mappingData();
    this.createHoursList();
    this.createMinutesList();
    this.updateClockHourHand();
    this.updateClockMinutesHand();
    this.addClockEventListeners();
  }

  mappingData(): void {
    const [hour, minute] = this.dialogData.time.split(':');
    this.selectedHour = hour.padStart(2, '0');
    this.displayedHour = hour.toString().padStart(2, '0');
    this.selectedMinute = minute.toString().padStart(2, '0');
  }

  createHoursList(): void {
    const outerRadius = 135;
    const innerRadius = 75;

    this.hoursList = [
      ...Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        label: (i + 1).toString().padStart(2, '0'),
        transform: this.calculateTransform(i + 1, 12, outerRadius),
      })),
      ...Array.from({ length: 12 }, (_, i) => ({
        id: i + 13,
        label: ((i + 13) % 24).toString().padStart(2, '0'),
        transform: this.calculateTransform(i + 1, 12, innerRadius),
      })),
    ];
  }

  createMinutesList(): void {
    this.minutesList = Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      label: (i * 5).toString().padStart(2, '0'),
      transform: this.calculateTransform(i * 5, 60, 130),
    }));
  }

  updateClockHourHand(): void {
    const hourDegree = Number(this.selectedHour) * 30 - 90;
    this.hourHandTransform = `rotate(${hourDegree}deg)`;
  }

  updateClockMinutesHand() {
    const minuteDegree = Number(this.selectedMinute) * 6 - 90;
    this.minuteHandTransform = `rotate(${minuteDegree}deg)`;
  }

  calculateTransform(
    value: number,
    totalUnits: number,
    radius: number
  ): string {
    const angle = value * (360 / totalUnits) - 90;
    const x = radius * Math.cos((angle * Math.PI) / 180);
    const y = radius * Math.sin((angle * Math.PI) / 180);
    return `translate(${x}px, ${y}px) translate(-50%, -50%)`;
  }

  addClockEventListeners() {
    const clockElement = this.clock.nativeElement;
    clockElement.addEventListener('mousedown', this.onMouseDown.bind(this));
    clockElement.addEventListener('mousemove', this.onMouseMove.bind(this));
    clockElement.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  onMouseDown(event: MouseEvent) {
    if (!event) return;
    this.isDragging = true;
    this.updateTimeOnDrag(event);
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;
    this.updateTimeOnDrag(event);
  }

  onMouseUp(event: MouseEvent) {
    this.isDragging = false;
    if (this.isSelectingHours) this.isSelectingHours = false;
  }

  updateTimeOnDrag(event: MouseEvent) {
    const rect = this.clock.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    const angle = Math.atan2(y, x) * (180 / Math.PI) + 90;

    if (this.isSelectingHours) {
      this.updateHourTimeOnDrag(angle, x, y);
    } else {
      this.updateMinutesTimeOnDrag(angle);
    }
  }

  updateHourTimeOnDrag(angle: number, xAxis: number, yAxis: number): void {
    const distanceFromCenter = Math.sqrt(xAxis * xAxis + yAxis * yAxis);
    const outerRadius = 135;
    const innerRadius = 90;
    let hour: number;

    if (distanceFromCenter <= innerRadius) {
      hour = this.calculateTimeFromAngle(angle, 12) + 12;
      if (hour === 12) hour = 0;
    } else {
      hour = this.calculateTimeFromAngle(angle, 12) || 12;
    }

    this.selectedHour = hour.toString().padStart(2, '0');
    this.displayedHour = hour.toString().padStart(2, '0');
    this.updateClockHourHand();
  }

  updateMinutesTimeOnDrag(angle: number) {
    this.selectedMinute = this.calculateTimeFromAngle(angle, 60)
      .toString()
      .padStart(2, '0');
    this.updateClockMinutesHand();
  }

  calculateTimeFromAngle(angle: number, divisions: number): number {
    const normalizedAngle = angle < 0 ? 360 + angle : angle;
    const divisionAngle = 360 / divisions;
    return Math.round(normalizedAngle / divisionAngle) % divisions;
  }

  setSelectionTimeState(selectingHours: boolean): void {
    this.isSelectingHours = selectingHours;
  }

  selectHour(hour: HourData) {
    this.selectedHour = hour.label;
    this.displayedHour = hour.label.padStart(2, '0');
  }

  selectMinute(minute: MinuteData) {
    this.selectedMinute = minute.label;
  }

  isMinuteMultipleOfFive(minute: string): boolean {
    const minuteNumber = Number(minute);
    return minuteNumber % 5 === 0;
  }

  closeDialog(): void {
    this.dialogRef.close(this.formattedTime);
  }

  get formattedTime() {
    const hour = this.displayedHour;
    const minute = this.selectedMinute.toString().padStart(2, '0');
    return `${hour}:${minute}`;
  }
}
