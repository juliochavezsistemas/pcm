import { Routes } from '@angular/router';
import { AdministracionDeUsuariosComponent } from './public/administracion-de-usuarios/administracion-de-usuarios.component';
import { AdministrarSistemaComponent } from './public/administrar-sistema/administrar-sistema.component';
import { AgendaOficialComponent } from './public/agenda-oficial/agenda-oficial.component';
import { AnadirEventoGIFEComponent } from './public/anadir-evento-gife/anadir-evento-gife.component';
import { AnadirEventoComponent } from './public/anadir-evento/anadir-evento.component';
import { BienvenidaComponent } from './public/bienvenida/bienvenida.component';
import { NuevoUsuarioComponent } from './public/nuevo-usuario/nuevo-usuario.component';
import { RegistrandoVisitasExtemporaneasComponent } from './public/registrando-visitas-extemporaneas/registrando-visitas-extemporaneas.component';
import { RegistrandoVisitasComponent } from './public/registrando-visitas/registrando-visitas.component';
import { RegistroDeVisitasComponent } from './public/registro-de-visitas/registro-de-visitas.component';
import { RegistroExtemporaneoDeVisitasComponent } from './public/registro-extemporaneo-de-visitas/registro-extemporaneo-de-visitas.component';
import { ReporteDeVisitasComponent } from './public/reporte-de-visitas/reporte-de-visitas.component';
import { DiaSinActividadOficialComponent } from './public/dia-sin-actividad-oficial/dia-sin-actividad-oficial.component';

export const routes: Routes = [
    {
        path: 'registrando-visitas',
        component: RegistrandoVisitasComponent
    },
    {
        path: 'registro-de-visitas',
        component: RegistroDeVisitasComponent
    },
    {
        path: 'bienvenida',
        component: BienvenidaComponent
    },
    {
        path: 'registro-extemporaneo-de-visitas',
        component: RegistroExtemporaneoDeVisitasComponent
    },
    {
        path: 'registro-de-visitas-extemporaneo',
        component: RegistrandoVisitasExtemporaneasComponent
    },
    {
        path: 'reporte-de-visitas',
        component: ReporteDeVisitasComponent
    },
    {
        path: 'agenda-oficial',
        component: AgendaOficialComponent
    },
    {
        path: 'anadir-evento',
        component: AnadirEventoComponent
    },
    {
        path: 'anadir-evento-gife',
        component: AnadirEventoGIFEComponent
    },
    {
        path: 'administrar-sistema',
        component: AdministrarSistemaComponent
    },
    {
        path: 'administracion-de-usuarios',
        component: AdministracionDeUsuariosComponent
    },
    {
        path: 'nuevo-usuario',
        component: NuevoUsuarioComponent
    },
    {
        path: 'dia-sin-actividad-oficial',
        component: DiaSinActividadOficialComponent
    },
]
