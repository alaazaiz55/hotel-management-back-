import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';



const BASIC_URL = "http://localhost:8089/rooms/";
@Injectable({
  providedIn: 'root'
})
export class AdminService {




  getRoomById(roomID: string): Observable<any> {
console.log(roomID)

   return this.http.get(`${BASIC_URL}${roomID}`)
  }


  getBookingByConfirmationCode(confirmationCode: string): Observable<any> {
    throw new Error('Method not implemented.');
  }
  getAvailableType(roomType: any): Observable<any> {

    //const payload = { ...roomType };
    console.log(roomType)
    return this.http.get(`${BASIC_URL}typeRoom/${roomType}`)

  }


constructor(private http: HttpClient, private storageService: StorageService){}


getAllRooms(): Observable<any> {
  return this.http.get(BASIC_URL + 'all')
 }

 getAvailableRoomsByDateAndType(startDate: string, endDate: string, roomType: string,
  
 ): Observable<any> {
  const params = new HttpParams()
    .set('dateIn', startDate)
    .set('dateOut', endDate)
    .set('roomType', roomType);

  console.log(params.toString());  // Affiche les paramètres de requête

  return this.http.get(BASIC_URL + 'roomSelec', { params });
}
  getRoomTypes(): Observable<any> {

    return this.http.get(BASIC_URL + 'type' )

  }
  isAdmin(): boolean {
    const role = this.storageService.getUserRole(); 
    return role === 'ADMIN';
  }

}
