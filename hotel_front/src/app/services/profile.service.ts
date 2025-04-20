import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const BASIC_URL = "http://localhost:8089/auth/";
@Injectable({
  providedIn: 'root'
})
export class ProfileService {




  constructor(private http: HttpClient) { }

  getUserById(id: any): Observable<any> {

    return this.http.get(`${BASIC_URL}userid/${id}`)

  }


  getUserBookings(id: any): Observable<any> {
    throw new Error('Method not implemented.');
  }
  getUserProfile(id : any):Observable<any> {


    return this.http.get(`${BASIC_URL}user/${id}`)

  }

}
