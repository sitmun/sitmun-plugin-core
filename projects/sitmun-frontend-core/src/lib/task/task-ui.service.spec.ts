import { TestBed, inject } from '@angular/core/testing';

import { TaskUIService } from './task-ui.service';

describe('TaskUIService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskUIService]
    });
  });

  it('should be created', inject([TaskUIService], (service: TaskUIService) => {
    expect(service).toBeTruthy();
  }));
});
