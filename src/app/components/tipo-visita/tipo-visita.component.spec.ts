import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoVisitaComponent } from './tipo-visita.component';

describe('TipoVisitaComponent', () => {
  let component: TipoVisitaComponent;
  let fixture: ComponentFixture<TipoVisitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoVisitaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoVisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
