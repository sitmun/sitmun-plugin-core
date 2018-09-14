import { TestBed, inject } from '@angular/core/testing';

import { MapConfigurationManagerService } from './map-configuration-manager.service';

describe('MapConfigurationManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapConfigurationManagerService]
    });
  });

  it('should be created', inject([MapConfigurationManagerService], (service: MapConfigurationManagerService) => {
    expect(service).toBeTruthy();
  }));
});
