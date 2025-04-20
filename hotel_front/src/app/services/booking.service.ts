import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

const BASIC_URL = "http://localhost:8089/booking/";
@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }


  bookRoom(roomId: string, userId: string, booking: any): Observable<{ bookingConfirmationCode: string }> {


    return this.http.post<{ bookingConfirmationCode: string }>(`${BASIC_URL}save/${roomId}/book/${userId}`, booking);
}
}
