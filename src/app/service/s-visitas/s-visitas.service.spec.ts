import { TestBed } from '@angular/core/testing';

import { SVisitasService } from './s-visitas.service';

describe('SVisitasService', () => {
  let service: SVisitasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SVisitasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
