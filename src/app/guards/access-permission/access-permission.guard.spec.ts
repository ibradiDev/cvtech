import { TestBed } from '@angular/core/testing';

import { AccessPermissionGuard } from './access-permission.guard';

describe('AccessPermissionGuard', () => {
  let guard: AccessPermissionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AccessPermissionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
