import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SingleTimepickerComponent } from './components/single-timepicker/single-timepicker.component';
import { FullTimepickerComponent } from './components/full-timepicker/full-timepicker.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
  ],
})
export class AppComponent {
  private matDialog = inject(MatDialog);
  standardTimeValue: string;
  fullTimeValue: string;

  currentSingleTime: string;
  currentDate: Date;

  constructor() {
    this.currentDate = new Date();
    this.currentSingleTime = this.getCurrentSingleTime();
    this.standardTimeValue = this.currentSingleTime;
    this.fullTimeValue = this.getCurrentFullTime();
  }

  getCurrentSingleTime(): string {
    let hour = this.currentDate.getHours();
    const minutes = this.currentDate.getMinutes().toString().padStart(2, '0');

    const period = hour >= 12 ? 'PM' : 'AM';

    hour = hour % 12 || 12;
    const hourString = hour.toString().padStart(2, '0');

    return `${hourString}:${minutes} ${period}`;
  }

  getCurrentFullTime(): string {
    const hour = this.currentDate.getHours().toString().padStart(2, '0');
    const minutes = this.currentDate.getMinutes().toString().padStart(2, '0');

    return `${hour}:${minutes}`;
  }

  openDialogStandardTimepicker(): void {
    console.log('standard timepicker opening...');
    const dialogRef = this.matDialog.open(SingleTimepickerComponent, {
      data: {
        time: this.standardTimeValue,
      },
      panelClass: 'dialog-timepicker',
      width: '300px',
      height: '430px',
      hasBackdrop: true,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((value) => {
      this.standardTimeValue = value;
    });
  }

  openDialogFullTimepicker(): void {
    console.log('full timepicker opening...');
    const dialogRef = this.matDialog.open(FullTimepickerComponent, {
      data: {
        time: this.fullTimeValue,
      },
      panelClass: 'dialog-timepicker',
      width: '350px',
      height: '500px',
      hasBackdrop: true,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((value) => {
      this.fullTimeValue = value;
    });
  }
}
