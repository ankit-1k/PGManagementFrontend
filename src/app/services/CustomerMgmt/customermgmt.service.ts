import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomermgmtService {
  
  private baseUrl = environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  addNewCustomer(data:any):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/addnewcustomer`,data)
  }

  allCustomerList():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/getallcustomer`)
  }

  updateCustomer(id: string, data: FormData): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/updatecustomer/${id}`, data);
  }  
  
  deleteCustomer(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/deletecustomer/${id}`);
  }
}
