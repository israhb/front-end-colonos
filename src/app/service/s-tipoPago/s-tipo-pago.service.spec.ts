import { TestBed } from '@angular/core/testing';

import { STipoPagoService } from './s-tipo-pago.service';

describe('STipoPagoService', () => {
  let service: STipoPagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(STipoPagoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
