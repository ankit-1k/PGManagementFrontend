import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  baseUrl: string = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  createRoom(room: any) {
    return this.http.post(`${this.baseUrl}/addroom`, room);
  }

  getRooms() {
    return this.http.get<any[]>(`${this.baseUrl}/getallroom`);
  }

  deleteRoom(id: string) {
    return this.http.delete(`${`${this.baseUrl}`}/deleteroom/${id}`);
  }

  updateRoom(id: string, room: any) {
    return this.http.put(`${this.baseUrl}/updateroom/${id}`, room);
  }

  allCustomerList(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getallcustomer`);
  }

  checkRoomAvailability(roomNumber: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/check/${roomNumber}`);
  }

  getRoomDetails(roomNumber: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/roomsdetails/${roomNumber}`);
  }    
}
