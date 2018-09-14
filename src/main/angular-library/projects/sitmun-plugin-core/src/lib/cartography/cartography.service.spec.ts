import { TestBed, inject } from '@angular/core/testing';

import { CartographyService } from './cartography.service';

describe('CartographyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartographyService]
    });
  });

  it('should be created', inject([CartographyService], (service: CartographyService) => {
    expect(service).toBeTruthy();
  }));
});
