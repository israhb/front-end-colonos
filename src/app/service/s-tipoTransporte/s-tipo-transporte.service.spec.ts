import { TestBed } from '@angular/core/testing';

import { STipoTransporteService } from './s-tipo-transporte.service';

describe('STipoTransporteService', () => {
  let service: STipoTransporteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(STipoTransporteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
