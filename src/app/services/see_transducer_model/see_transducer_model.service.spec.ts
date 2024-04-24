import { TestBed } from '@angular/core/testing';

import { SeeTranducerModel } from './see_transducer_model.service';

describe('SeeTranducerModel', () => {
  let service: SeeTranducerModel;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeeTranducerModel);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
