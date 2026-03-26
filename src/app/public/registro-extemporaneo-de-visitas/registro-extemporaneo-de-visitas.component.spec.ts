import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroExtemporaneoDeVisitasComponent } from './registro-extemporaneo-de-visitas.component';

describe('RegistroExtemporaneoDeVisitasComponent', () => {
  let component: RegistroExtemporaneoDeVisitasComponent;
  let fixture: ComponentFixture<RegistroExtemporaneoDeVisitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroExtemporaneoDeVisitasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroExtemporaneoDeVisitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
