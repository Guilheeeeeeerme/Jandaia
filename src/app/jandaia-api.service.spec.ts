import { TestBed } from '@angular/core/testing';

import { JandaiaAPIService } from './jandaia-api.service';

describe('JandaiaAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JandaiaAPIService = TestBed.get(JandaiaAPIService);
    expect(service).toBeTruthy();
  });
});
