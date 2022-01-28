import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../interface/user.interface';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) {}

  getInfo(): Observable<IUser> {
    return this.http.get<IUser>('/api/user');
  }

  updateUserLanguages(languages: Array<object>): Observable<IUser> {
    let body = {
      "languages": languages
    }
    console.log(body);
    return this.http.patch<IUser>('/api/user', body);
  }
}
