import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { PanelModule } from 'primeng/panel';
import { MessageModule } from 'primeng/message';
import { LoginRequest } from '../../Models/LoginRequest';
import { LogginService } from '../../Services/loggin.service';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-loggin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    PanelModule,
    MessageModule,
    ToastModule

  ],
  providers: [MessageService],
  templateUrl: './loggin.component.html',
  styleUrls: ['./loggin.component.css']
})
export class LogginComponent {

  user: LoginRequest = new LoginRequest();
  submitted: boolean = false;
  errorMessage: string = '';

  constructor(private logginService: LogginService, private router: Router, private messageService: MessageService) { }

  login() {
    this.submitted = true;
    this.errorMessage = '';

    if (!this.user.userMail || !this.user.userPassword) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      return;
    }

    this.logginService.login(this.user).subscribe({
      next: (token: string) => {
        console.log('Token recibido:', token);

        localStorage.setItem('authToken', token);

        this.router.navigate(['home']);
      },
      error: (err) => {
        console.error('Error en login:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error de autenticación',
          detail: 'Credenciales inválidas o error en el servidor.',
          life: 3000
        });
      }

    });
  }
}
