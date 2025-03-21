import { Component, OnInit } from '@angular/core';
import { SuperadminService } from 'src/app/services/superadmin/superadmin.service';

interface CustomerSummary {
  name: string;
  email: string;
  amount: number;
}

@Component({
  selector: 'app-paid',
  templateUrl: './paid.component.html',
  styleUrls: ['./paid.component.scss']
})
export class PaidComponent implements OnInit {
  allDataList: any[] = [];
  totalAmount: number = 0;
  customerSummary: { [email: string]: CustomerSummary } = {};
  customerList: CustomerSummary[] = []; 
  topCustomer: CustomerSummary = { name: '', email: '', amount: 0 };
  highVisible:boolean=false

  constructor(private paidService: SuperadminService) { }

  ngOnInit(): void {
    this.getReportsDataList();
  }

  getReportsDataList() {
    this.paidService.getReportsDataList().subscribe({
      next: response => {
        this.allDataList = response.data;
        this.calculateSummary();
      },
      error: error => {
        console.log(error);
      }
    });
  }

  calculateSummary() {
    this.totalAmount = 0;
    this.customerSummary = {};

    this.allDataList.forEach(report => {
      const { name, email, amount } = report;
      this.totalAmount += amount;

      if (!this.customerSummary[email]) {
        this.customerSummary[email] = { name, email, amount: 0 };
      }
      this.customerSummary[email].amount += amount;
    });

    // Convert customerSummary object to an array
    this.customerList = Object.values(this.customerSummary);

    // Find the top customer
    this.topCustomer = this.customerList.reduce(
      (max, customer) => (customer.amount > max.amount ? customer : max),
      { name: '', email: '', amount: 0 } as CustomerSummary
    );
  }

  highDialog(){
    this.highVisible=true
  }
}

