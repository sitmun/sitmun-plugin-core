import { TestBed, inject } from '@angular/core/testing';

import { ServiceParameterService } from './service-parameter.service';

describe('ServiceParameterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceParameterService]
    });
  });

  it('should be created', inject([ServiceParameterService], (service: ServiceParameterService) => {
    expect(service).toBeTruthy();
  }));
});
