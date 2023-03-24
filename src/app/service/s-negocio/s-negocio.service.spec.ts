import { TestBed } from '@angular/core/testing';

import { SNegocioService } from './s-negocio.service';

describe('SNegocioService', () => {
  let service: SNegocioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SNegocioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
