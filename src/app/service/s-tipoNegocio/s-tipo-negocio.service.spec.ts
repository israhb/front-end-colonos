import { TestBed } from '@angular/core/testing';

import { STipoNegocioService } from './s-tipo-negocio.service';

describe('STipoNegocioService', () => {
  let service: STipoNegocioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(STipoNegocioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
