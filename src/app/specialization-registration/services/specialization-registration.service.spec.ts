import { TestBed } from '@angular/core/testing';

import { SpecializationRegistrationService } from './specialization-registration.service';

describe('SpecializationRegistrationService', () => {
  let service: SpecializationRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecializationRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
