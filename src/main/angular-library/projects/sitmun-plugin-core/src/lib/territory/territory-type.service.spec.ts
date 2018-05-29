import { TestBed, inject } from '@angular/core/testing';

import { TerritoryTypeService } from './territory-type.service';

describe('TerritoryTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TerritoryTypeService]
    });
  });

  it('should be created', inject([TerritoryTypeService], (service: TerritoryTypeService) => {
    expect(service).toBeTruthy();
  }));
});
