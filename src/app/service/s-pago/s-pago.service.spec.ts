import { TestBed } from '@angular/core/testing';

import { SPagoService } from './s-pago.service';

describe('SPagoService', () => {
  let service: SPagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SPagoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
