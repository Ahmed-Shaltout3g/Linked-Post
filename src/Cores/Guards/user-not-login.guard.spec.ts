import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userNotLoginGuard } from './user-not-login.guard';

describe('userNotLoginGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userNotLoginGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
