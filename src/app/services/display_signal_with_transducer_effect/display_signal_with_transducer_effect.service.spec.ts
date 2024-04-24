import { TestBed } from '@angular/core/testing';

import { Display_signal_with_transducer_effect } from './display_signal_with_transducer_effect.service';

describe('DisplayCarrierSignalService', () => {
  let service: Display_signal_with_transducer_effect;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Display_signal_with_transducer_effect);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
