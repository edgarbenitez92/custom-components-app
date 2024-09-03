import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutValidatorWdComponent } from './rut-validator-wd.component';

describe('RutValidatorWdComponent', () => {
  let component: RutValidatorWdComponent;
  let fixture: ComponentFixture<RutValidatorWdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RutValidatorWdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RutValidatorWdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
