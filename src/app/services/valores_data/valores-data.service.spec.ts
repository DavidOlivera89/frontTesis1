import { TestBed } from '@angular/core/testing';

import { ValoresDataService } from './valores-data.service';

describe('ValoresDataService', () => {
  let service: ValoresDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValoresDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
