import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaSinActividadOficialComponent } from './dia-sin-actividad-oficial.component';

describe('DiaSinActividadOficialComponent', () => {
  let component: DiaSinActividadOficialComponent;
  let fixture: ComponentFixture<DiaSinActividadOficialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiaSinActividadOficialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiaSinActividadOficialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
