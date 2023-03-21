import { TestBed } from '@angular/core/testing';

import { STipoComunicadoService } from './s-tipo-comunicado.service';

describe('STipoComunicadoService', () => {
  let service: STipoComunicadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(STipoComunicadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
