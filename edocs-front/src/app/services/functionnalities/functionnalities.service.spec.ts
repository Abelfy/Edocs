import { TestBed } from '@angular/core/testing';

import { FunctionnalitiesService } from './functionnalities.service';

describe('FunctionnalitiesService', () => {
  let service: FunctionnalitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FunctionnalitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
