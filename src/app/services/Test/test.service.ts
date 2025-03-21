import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  // Get Razorpay Key
  getRazorpayKey() {
    return this.http.get<{ key: string }>(`${this.baseUrl}/get-razorpay-key`);
  }

  // Create Order
  createOrder(amount: number, items: any[], name: string, email: string) {
    return this.http.post(`${this.baseUrl}/create-order`, { amount, items, name, email });
  }

  // Verify Payment
  verifyPayment(paymentData: any) {
    return this.http.post<{ success: boolean; message: string }>(
      `${this.baseUrl}/verify-payment`,
      paymentData
    );
  }  
}
