import { TestBed } from '@angular/core/testing';

import { AutentikacijaGuard } from './autentikacija.guard';

describe('AutentikacijaGuard', () => {
  let guard: AutentikacijaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AutentikacijaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
