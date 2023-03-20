import { TestBed } from '@angular/core/testing';

import { SFraccionamientoService } from './s-fraccionamiento.service';

describe('SFraccionamientoService', () => {
  let service: SFraccionamientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SFraccionamientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
