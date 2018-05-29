import { TestBed, inject } from '@angular/core/testing';

import { UserConfigurationService } from './user-configuration.service';

describe('UserConfigurationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserConfigurationService]
    });
  });

  it('should be created', inject([UserConfigurationService], (service: UserConfigurationService) => {
    expect(service).toBeTruthy();
  }));
});
