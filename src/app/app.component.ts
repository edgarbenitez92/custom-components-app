import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogTimepickerComponent } from './components/dialog-timepicker/dialog-timepicker.component';

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

  amPmTimeValue: string;
  fullTimeValue: string;

  constructor() {
    this.amPmTimeValue = '10:11 PM';
    this.fullTimeValue = '22:11';
  }

  openDialogTimePicker(type: string): void {
    console.log('timepicker opening...', type);
    const dialogRef = this.matDialog.open(DialogTimepickerComponent, {
      data: {
        time: this.amPmTimeValue,
      },
      panelClass: 'dialog-timepicker',
      width: '300px',
      height: '430px',
      hasBackdrop: true,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((value) => {
      this.amPmTimeValue = value;
    });
  }
}
