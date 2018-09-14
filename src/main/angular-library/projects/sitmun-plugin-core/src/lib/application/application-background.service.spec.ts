import { TestBed, inject } from '@angular/core/testing';

import { ApplicationBackgroundService } from './application-background.service';

describe('ApplicationBackgroundService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApplicationBackgroundService]
    });
  });

  it('should be created', inject([ApplicationBackgroundService], (service: ApplicationBackgroundService) => {
    expect(service).toBeTruthy();
  }));
});
