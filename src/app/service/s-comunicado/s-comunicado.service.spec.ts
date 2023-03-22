import { TestBed } from '@angular/core/testing';

import { SComunicadoService } from './s-comunicado.service';

describe('SComunicadoService', () => {
  let service: SComunicadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SComunicadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
