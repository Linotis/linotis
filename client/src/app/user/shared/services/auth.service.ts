import { Injectable } from '@angular/core';
import { IUserLogin, IUserRegister } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token = '';

  constructor(private http: HttpClient) {}

  register(user: IUserRegister): Observable<IUserRegister> {
    return this.http.post<IUserRegister>('/api/auth/register', user);
  }

  login(user: IUserLogin): Observable<{token: string}> {
    return this.http.post<{token: string}>('/api/auth/login', user).pipe(tap(({token}) => {
      localStorage.setItem('auth-token', token);
    }))
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  logOut() {
    this.setToken('');
    localStorage.clear();
  }
}
