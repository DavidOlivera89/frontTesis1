import { TestBed } from '@angular/core/testing';

import { DisplayCarrierSignalService } from './display_modulated_signal.service';

describe('DisplayCarrierSignalService', () => {
  let service: DisplayCarrierSignalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplayCarrierSignalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
