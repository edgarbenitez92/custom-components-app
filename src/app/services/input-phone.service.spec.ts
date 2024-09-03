import { TestBed } from '@angular/core/testing';

import { InputPhoneService } from './input-phone.service';

describe('InputPhoneService', () => {
  let service: InputPhoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputPhoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
