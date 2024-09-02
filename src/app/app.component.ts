import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SingleTimepickerComponent } from './components/single-timepicker/single-timepicker.component';

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

  title = 'custom-timepicker';

  standardTimeValue: string;
  fullTimeValue: string;

  currentSingleTime: string;

  constructor() {
    this.currentSingleTime = this.getCurrentSingleTime();
    this.standardTimeValue = this.currentSingleTime;
    this.fullTimeValue = '22:11';
  }

  getCurrentSingleTime(): string {
    const currentDate = new Date();
    let hour = currentDate.getHours();
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');

    const period = hour >= 12 ? 'PM' : 'AM';

    hour = hour % 12 || 12;
    const hourString = hour.toString().padStart(2, '0');

    return `${hourString}:${minutes} ${period}`;
  }

  openDialogTimePicker(type: string): void {
    console.log('timepicker opening...', type);
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
}
