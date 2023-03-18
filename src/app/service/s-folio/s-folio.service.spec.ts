import { TestBed } from '@angular/core/testing';

import { SFolioService } from './s-folio.service';

describe('SFolioService', () => {
  let service: SFolioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SFolioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
