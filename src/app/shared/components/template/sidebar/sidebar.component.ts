import {
  Component,
  computed,
  inject,
  input,
  signal
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PanelMenu } from 'primeng/panelmenu';
import { RolesUser } from '../../../enums/roles-user.enum';
import { LayoutService } from '../../../services/layout.service';
import { _authMe } from '../../../signals/models/auth-me';

@Component({
  selector: 'app-sidebar',
  imports: [
    PanelMenu
  ],
  templateUrl: './sidebar.component.html',
  standalone: true,
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent {
  public items = signal<MenuItem[]>([])
  public sidebarVisible = input.required<boolean>()
  public layout = inject(LayoutService)

  protected visibleItems = computed(() =>
    this.filterMenuItems(this.items(), _authMe().rol)
  )

  private filterMenuItems(items: any[], userRol: string): any[] {
    return items
      .map(item => {
        const newItem = { ...item }

        // si tiene subitems, filtrarlos también
        if (newItem.items) {
          newItem.items = this.filterMenuItems(newItem.items, userRol)
        }

        // validar este item
        const canSee = this.searchRol(newItem.rol, userRol)

        // conservar si:
        // - el usuario puede verlo
        // - o si tiene hijos visibles
        if (canSee || (newItem.items && newItem.items.length > 0)) {
          return newItem
        }

        return null
      })
      .filter(item => item !== null) as any[]
  }

  private searchRol(rolesItem: any[], userRol: string): boolean {
    if (!Array.isArray(rolesItem)) return true
    return rolesItem.includes('*') || rolesItem.includes(userRol)
  }

  ngOnInit() {
    this.items.set([
      {
        rol: ['*'],
        label: 'Dashboard',
        icon: 'pi pi-gauge',
        routerLink: ['/dashboard'],
        command: () => {
          this.layout.closeAll()
        }
      },
      {
        rol: [RolesUser.ENTIDAD],
        label: 'Expedientes',
        icon: 'bi bi-journals',
        routerLink: ['/expediente/entidad'],
        command: () => {
          this.layout.closeAll()
        }
      },
      {
        rol: [RolesUser.ABOGADO],
        label: 'Expedientes',
        icon: 'bi bi-journals',
        routerLink: ['/expediente/abogado'],
        command: () => {
          this.layout.closeAll()
        }
      },
      //INCIO DE PROCESOS
      {
        rol: [RolesUser.ADMIN, RolesUser.SUPERADMIN],
        label: 'Procesos',
        icon: 'bi bi-gear',
        items: [
          {
            rol: [RolesUser.ADMIN, RolesUser.SUPERADMIN],
            label: 'Expedientes',
            icon: 'pi pi-briefcase',
            routerLink: '/expediente',
            command: () => {
              this.layout.closeAll()
            }
          }
        ]
      },
      //FIN DE PROCESOS
      //INICIO DE MANTENIMIENTO
      {
        rol: [RolesUser.ADMIN, RolesUser.SUPERADMIN],
        label: 'Mantenimiento',
        icon: 'bi bi-server',
        items: [
          {
            rol: [RolesUser.SUPERADMIN],
            label: 'Usuarios',
            icon: 'pi pi-user',
            routerLink: '/usuario',
            command: () => {
              this.layout.closeAll()
            }
          },
          {
            rol: [RolesUser.ADMIN, RolesUser.SUPERADMIN],
            label: 'Abogados',
            icon: 'pi pi-book',
            routerLink: '/abogado',
            command: () => {
              this.layout.closeAll()
            }
          },
          {
            rol: [RolesUser.ADMIN, RolesUser.SUPERADMIN],
            label: 'Partes',
            icon: 'pi pi-building',
            routerLink: '/parte',
            command: () => {
              this.layout.closeAll()
            }
          }
        ]
      }
      //FIN DE MANTENIMIENTO
      ,
      {
        rol: [RolesUser.SUPERADMIN],
        label: 'Configuración',
        icon: 'bi bi-magic',
        routerLink: '/configuracion',
        command: () => {
          this.layout.closeAll()
        }
        // items: [
        //   {
        //     rol: [RolesUser.SUPERADMIN],
        //     label: 'Alertas',
        //     icon: 'bi bi-bell',
        //     routerLink: '/abogado',
        //     command: () => {
        //       this.layout.closeAll()
        //     }
        //   },
        //   {
        //     rol: [RolesUser.SUPERADMIN],
        //     label: 'Entidad ANARB',
        //     icon: 'pi pi-building',
        //     routerLink: '/entidad',
        //     command: () => {
        //       this.layout.closeAll()
        //     }
        //   }
        // ]
      },
      {
        rol: [RolesUser.SUPERADMIN],
        label: 'Sesiones',
        icon: 'bi bi-shield-check',
        routerLink: '/sesiones',
        command: () => {
          this.layout.closeAll()
        }
      }
    ])
  }
}
