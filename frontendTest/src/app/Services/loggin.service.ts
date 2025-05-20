import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from '../Models/LoginRequest';


@Injectable({
  providedIn: 'root'
})
export class LogginService {

  private readonly endpoint: string = 'http://localhost:5195/userValidateLogin';

  constructor(private http: HttpClient) {}

  login(user: LoginRequest): Observable<string> {
   
    return this.http.post(this.endpoint, user, { responseType: 'text' });
  }
}
