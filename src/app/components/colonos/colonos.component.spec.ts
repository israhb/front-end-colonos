import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColonosComponent } from './colonos.component';

describe('ColonosComponent', () => {
  let component: ColonosComponent;
  let fixture: ComponentFixture<ColonosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColonosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColonosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
