import { TestBed, inject } from '@angular/core/testing';

import { TaskParameterService } from './task-parameter.service';

describe('TaskParameterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskParameterService]
    });
  });

  it('should be created', inject([TaskParameterService], (service: TaskParameterService) => {
    expect(service).toBeTruthy();
  }));
});
