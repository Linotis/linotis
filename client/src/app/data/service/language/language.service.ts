import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILanguage } from '../../interface/language.interface';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private http: HttpClient) { }

  getLanguages(): Observable<ILanguage[]> {
    return this.http.get<ILanguage[]>('/api/languages');
  }
}
