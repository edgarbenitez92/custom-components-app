import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTimepickerComponent } from './dialog-timepicker.component';

describe('DialogTimepickerComponent', () => {
  let component: DialogTimepickerComponent;
  let fixture: ComponentFixture<DialogTimepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogTimepickerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogTimepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
