import { TestBed } from '@angular/core/testing';

import { WpLoginService } from './wp-login.service';

describe('WpLoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WpLoginService = TestBed.get(WpLoginService);
    expect(service).toBeTruthy();
  });
});
