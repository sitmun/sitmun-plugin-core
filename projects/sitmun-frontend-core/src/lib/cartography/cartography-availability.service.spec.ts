import { TestBed, inject } from '@angular/core/testing';

import { CartographyAvailabilityService } from './cartography-availability.service';

describe('CartographyAvailabilityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartographyAvailabilityService]
    });
  });

  it('should be created', inject([CartographyAvailabilityService], (service: CartographyAvailabilityService) => {
    expect(service).toBeTruthy();
  }));
});
