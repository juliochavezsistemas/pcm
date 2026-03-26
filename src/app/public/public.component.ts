import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService } from 'primeng/dynamicdialog';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from "primeng/tooltip";
import { BaseMainComponent } from '../shared/classes/base-main-component';
import { CardModule } from "primeng/card";
@Component({
  selector: 'app-public',
  imports: [
    TagModule,
    TooltipModule,
    DropdownModule,
    ButtonModule,
    SelectModule,
    CardModule
  ],
  providers: [
    DialogService
  ],
  templateUrl: './public.component.html',
  styleUrl: './public.component.scss'
})

export class PublicComponent extends BaseMainComponent {
  usuarioSeleccionado: any = 'aldo';

  visita = {
    aQuienVisita: null,
    lugarReunion: null
  };

  // Datos de ejemplo
  personas = [
    { nombre: 'MIRTA LOPEZ TORRES', id: 1 }
    // Agrega más personas aquí
  ];

  lugares = [
    { nombre: 'Sala de Reuniones 1', id: 1 },
    { nombre: 'Oficina Principal', id: 2 },
    { nombre: 'Auditorio', id: 3 }
    // Agrega los lugares reales
  ];

  ngOnInit() {
    // Si ya tienes un valor preseleccionado
    // this.visita.aQuienVisita = this.personas[0];
  }

  regresar() {
    // Lógica para regresar
    console.log('Regresar');
  }

  continuar() {
    if (!this.visita.aQuienVisita || !this.visita.lugarReunion) {
      // Mostrar mensaje de error con PrimeNG Toast
      return;
    }
    console.log('Datos de visita:', this.visita);
    // Lógica para continuar
  }
}
