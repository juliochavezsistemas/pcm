import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrandoVisitasExtemporaneasComponent } from './registrando-visitas-extemporaneas.component';

describe('RegistrandoVisitasExtemporaneasComponent', () => {
  let component: RegistrandoVisitasExtemporaneasComponent;
  let fixture: ComponentFixture<RegistrandoVisitasExtemporaneasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrandoVisitasExtemporaneasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrandoVisitasExtemporaneasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
