import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutValidatorFormComponent } from './rut-validator-form.component';

describe('RutValidatorFormComponent', () => {
  let component: RutValidatorFormComponent;
  let fixture: ComponentFixture<RutValidatorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RutValidatorFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RutValidatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
