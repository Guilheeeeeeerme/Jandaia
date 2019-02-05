import { TestBed } from '@angular/core/testing';

import { SppinerService } from './sppiner.service';

describe('SppinerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SppinerService = TestBed.get(SppinerService);
    expect(service).toBeTruthy();
  });
});
