import { TestBed } from '@angular/core/testing';

import { DoctorReistrationService } from './doctor-registration.service';

describe('DoctorReistrationService', () => {
  let service: DoctorReistrationService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorReistrationService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
