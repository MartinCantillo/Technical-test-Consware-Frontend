import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { AuthServiceServiceService } from '../../../Services/auth-service-service.service';

@Component({
  selector: 'app-nabvar',
  standalone: true,
  imports: [RouterOutlet, MenubarModule],
  templateUrl: './nabvar.component.html',
  styleUrl: './nabvar.component.css'
})
export class NabvarComponent {


  constructor(private authServiceServiceService:AuthServiceServiceService,
    private router: Router
  )
{
  
}
   items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: ['/home']
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
  this.authServiceServiceService.logout();
  this.router.navigate(['']);
    console.log('Usuario ha cerrado sesión');
  }
}
