import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FraccionamientosComponent } from './fraccionamientos.component';

describe('FraccionamientosComponent', () => {
  let component: FraccionamientosComponent;
  let fixture: ComponentFixture<FraccionamientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FraccionamientosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FraccionamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
