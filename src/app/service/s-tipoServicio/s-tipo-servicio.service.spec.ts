import { TestBed } from '@angular/core/testing';

import { STipoServicioService } from './s-tipo-servicio.service';

describe('STipoServicioService', () => {
  let service: STipoServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(STipoServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
