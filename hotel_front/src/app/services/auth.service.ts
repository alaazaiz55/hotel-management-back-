import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

const BASIC_URL = "http://localhost:8089/auth/";
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient) { }


  login(form: any): Observable<any> {
    const payload = { ...form };

    return this.http.post(BASIC_URL + 'login' , payload )
  }


  register(form: any): Observable<any> {
    const payload = { ...form };

    return this.http.post(BASIC_URL + 'register' , payload )
  }
}
