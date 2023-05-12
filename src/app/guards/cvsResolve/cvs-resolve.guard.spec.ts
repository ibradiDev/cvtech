import { TestBed } from '@angular/core/testing';

import { CvsResolveGuard } from './cvs-resolve.guard';

describe('CvsResolveGuard', () => {
  let guard: CvsResolveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CvsResolveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
