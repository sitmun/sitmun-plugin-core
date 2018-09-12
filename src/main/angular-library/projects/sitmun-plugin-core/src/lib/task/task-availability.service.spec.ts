import { TestBed, inject } from '@angular/core/testing';

import { TaskAvailabilityService } from './task-availability.service';

describe('TaskAvailabilityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskAvailabilityService]
    });
  });

  it('should be created', inject([TaskAvailabilityService], (service: TaskAvailabilityService) => {
    expect(service).toBeTruthy();
  }));
});
