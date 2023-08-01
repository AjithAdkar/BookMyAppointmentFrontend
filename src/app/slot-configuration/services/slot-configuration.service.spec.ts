import { TestBed } from '@angular/core/testing';

import { SlotConfigurationService } from './slot-configuration.service';

describe('SlotConfigurationService', () => {
  let service: SlotConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlotConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
