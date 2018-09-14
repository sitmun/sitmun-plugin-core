import { TestBed, inject } from '@angular/core/testing';

import { CartographyGroupService } from './cartography-group.service';

describe('CartographyGroupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartographyGroupService]
    });
  });

  it('should be created', inject([CartographyGroupService], (service: CartographyGroupService) => {
    expect(service).toBeTruthy();
  }));
});
