import { TestBed } from '@angular/core/testing';

import { SColonoService } from './s-colono.service';

describe('SColonoService', () => {
  let service: SColonoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SColonoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
