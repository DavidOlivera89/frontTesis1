import { TestBed } from '@angular/core/testing';

import { Display_emmiters_receiver_3d } from './display_emmiters_receiver_3d.service';

describe('Display_emmiters_receiver_3d', () => {
  let service: Display_emmiters_receiver_3d;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Display_emmiters_receiver_3d);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
