import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTimepickerComponent } from './single-timepicker.component';

describe('SingleTimepickerComponent', () => {
  let component: SingleTimepickerComponent;
  let fixture: ComponentFixture<SingleTimepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleTimepickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SingleTimepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
