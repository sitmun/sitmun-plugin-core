import { TestBed, inject } from '@angular/core/testing';

import { TreeNodeService } from './tree-node.service';

describe('TreeNodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TreeNodeService]
    });
  });

  it('should be created', inject([TreeNodeService], (service: TreeNodeService) => {
    expect(service).toBeTruthy();
  }));
});
