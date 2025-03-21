import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private baseUrl=environment.apiBaseUrl

  constructor(private http: HttpClient) { }

  getMenu(): Observable<any> {
    return this.http.get(`${this.baseUrl}/menuget`);
  }

  // Add a new menu item
  addMenu(menuData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/menupost`, menuData);
  }

  // Update a menu item by ID
  updateMenu(id: string, menuData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/menuupdate/${id}`, menuData);
  }

  // Delete a menu item by ID
  deleteMenu(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/menudelete/${id}`);
  }
}
