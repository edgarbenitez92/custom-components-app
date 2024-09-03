import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutValidatorWpComponent } from './rut-validator-wp.component';

describe('RutValidatorWpComponent', () => {
  let component: RutValidatorWpComponent;
  let fixture: ComponentFixture<RutValidatorWpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RutValidatorWpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RutValidatorWpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
