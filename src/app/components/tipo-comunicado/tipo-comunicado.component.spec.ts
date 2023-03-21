import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoComunicadoComponent } from './tipo-comunicado.component';

describe('TipoComunicadoComponent', () => {
  let component: TipoComunicadoComponent;
  let fixture: ComponentFixture<TipoComunicadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoComunicadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoComunicadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
