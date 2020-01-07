import { TestBed, inject } from '@angular/core/testing';

import { TaskGroupService } from './task-group.service';

describe('TaskGroupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskGroupService]
    });
  });

  it('should be created', inject([TaskGroupService], (service: TaskGroupService) => {
    expect(service).toBeTruthy();
  }));
});
