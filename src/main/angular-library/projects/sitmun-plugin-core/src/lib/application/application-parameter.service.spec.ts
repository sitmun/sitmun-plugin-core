import { TestBed, inject } from '@angular/core/testing';

import { ApplicationParameterService } from './application-parameter.service';

describe('ApplicationParameterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApplicationParameterService]
    });
  });

  it('should be created', inject([ApplicationParameterService], (service: ApplicationParameterService) => {
    expect(service).toBeTruthy();
  }));
});
