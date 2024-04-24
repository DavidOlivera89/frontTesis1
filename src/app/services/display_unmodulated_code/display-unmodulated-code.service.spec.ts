import { TestBed } from '@angular/core/testing';

import { DisplayUnmodulatedCodeService } from './display-unmodulated-code.service';

describe('DisplayUnmodulatedCodeService', () => {
  let service: DisplayUnmodulatedCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplayUnmodulatedCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
