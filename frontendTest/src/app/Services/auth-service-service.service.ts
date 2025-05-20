import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from '../Models/DecodedToken';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceServiceService {

 private tokenKey = 'token';

  constructor() { }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getRoles(): string[] {
    const token = this.getToken();
    if (!token) return [];
    const decodedToken: any = jwtDecode(token);
    return decodedToken.roles || [];
  }

  hasRole(role: string): boolean {
    const roles = this.getRoles();
    return roles.includes(role);
  }

  hasAnyRole(roles: string[]): boolean {

    const userRoles = this.getRoles();
    return roles.some(role => userRoles.includes(role));
  }

isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decoded: DecodedToken = jwtDecode(token);
      if (!decoded.exp) return false; 
      const now = Date.now() / 1000;
      if (decoded.exp < now) {
        
        this.logout(); 
        return false;
      }

      return true;
    } catch (error) {
      
      return false;
    }
  }


  logout(): void {
    localStorage.removeItem(this.tokenKey);
   console.log("entro al logout ")

  }
}
