import { TestBed } from '@angular/core/testing';

import { SEstadoService } from './s-estado.service';

describe('SEstadoService', () => {
  let service: SEstadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SEstadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
