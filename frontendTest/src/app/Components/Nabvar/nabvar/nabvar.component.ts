import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-nabvar',
  standalone: true,
  imports: [RouterOutlet, MenubarModule],
  templateUrl: './nabvar.component.html',
  styleUrl: './nabvar.component.css'
})
export class NabvarComponent {

   items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: ['/']
      },
      {
        label: 'Vehículos',
        icon: 'pi pi-search',
        items: [
          { label: 'Guardar', icon: 'pi pi-save', routerLink: ['/vehiculos/guardar'] },
          { label: 'Editar',  icon: 'pi pi-pencil', routerLink: ['/vehiculos/editar'] },
          { label: 'Eliminar', icon: 'pi pi-trash', routerLink: ['/vehiculos/eliminar'] },
          { label: 'Obtener todos', icon: 'pi pi-list', routerLink: ['/vehiculos'] },
          { label: 'Obtener por id', icon: 'pi pi-filter', routerLink: ['/vehiculos/por-id'] }
        ]
      },
      {
        label: 'Iniciar Sesión',
        icon: 'pi pi-sign-in',
        routerLink: ['/loggin']
      },
      {
        label: 'Cerrar Sesión',
        icon: 'pi pi-sign-out',
        command: () => this.logout()
      }
    ];
  }

  logout() {
    // Lógica de cierre de sesión, p.ej., limpiar tokens, redirigir
    console.log('Usuario ha cerrado sesión');
  }
}
