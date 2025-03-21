import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SuperadminService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem("token");
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  sendOTP(): Observable<any> {
    return this.http.post(`${this.apiUrl}/generate-otp`, {});
  }

  verifyOTP(otp: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify-otp`, { otp });
  }

  getProtectedData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/protected-endpoint`, this.getHeaders());
  }

  getReportsDataList(): Observable<any> {
    return this.http.get(`${this.apiUrl}/reports`);
  }

  changePassword(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/change-password`, data);
  }
}
