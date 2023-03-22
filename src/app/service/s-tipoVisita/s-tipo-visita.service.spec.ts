import { TestBed } from '@angular/core/testing';

import { STipoVisitaService } from './s-tipo-visita.service';

describe('STipoVisitaService', () => {
  let service: STipoVisitaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(STipoVisitaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
