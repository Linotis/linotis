import { Injectable } from '@angular/core';
import { IUser } from '../../data/interface/user.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface ILoginContext {
  email: string
  password: string
}

interface IRegisterContext {
  firstName: string
  lastName: string
  age: number
  email: string
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token = '';

  constructor(private http: HttpClient) {}

  register(user: IRegisterContext): Observable<IUser> {
    return this.http.post<IRegisterContext>('/api/auth/register', user);
  }

  login(user: ILoginContext): Observable<{token: string}> {
    return this.http.post<{token: string}>('/api/auth/login', user).pipe(tap(({token}) => {
      localStorage.setItem('auth-token', token);
      this.setToken(token);
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
