import { TestBed, inject } from '@angular/core/testing';

import { UserPositionService } from './user-position.service';

describe('UserPositionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserPositionService]
    });
  });

  it('should be created', inject([UserPositionService], (service: UserPositionService) => {
    expect(service).toBeTruthy();
  }));
});
