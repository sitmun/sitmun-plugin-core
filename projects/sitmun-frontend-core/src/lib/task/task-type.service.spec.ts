import { TestBed, inject } from '@angular/core/testing';

import { TaskTypeService } from './task-type.service';

describe('TaskTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskTypeService]
    });
  });

  it('should be created', inject([TaskTypeService], (service: TaskTypeService) => {
    expect(service).toBeTruthy();
  }));
});
