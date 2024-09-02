import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullTimepickerComponent } from './full-timepicker.component';

describe('FullTimepickerComponent', () => {
  let component: FullTimepickerComponent;
  let fixture: ComponentFixture<FullTimepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullTimepickerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FullTimepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
