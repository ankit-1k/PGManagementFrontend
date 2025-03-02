import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomermgmtService } from 'src/app/services/CustomerMgmt/customermgmt.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  paymentForm: FormGroup;
  allCustomer: any[] = [];
  customers: any[] = [];
  filteredCustomers: any[] = [];
  selectedCustomer: any = {};

  constructor(private fb: FormBuilder, private customerService: CustomermgmtService) { 
    this.paymentForm = this.fb.group({
      customer: [null],
      roomNumber: [''],
      email: [''],
      phone: [''],
      amount: [''],
      dueDate: ['']
    });
  }

  ngOnInit(): void {
    this.allCustomersList();
  }

  allCustomersList() {
    this.customerService.allCustomerList().subscribe({
      next: (response) => {
        this.allCustomer = response;
        this.customers = this.allCustomer.map(customer => ({
          name: customer.name,
          profilePic:customer.profilePic,
          roomNumber: customer.roomNumber,
          email: customer.email,
          rentAmount:customer.rentAmount,
          phone: customer.phone,
          dueDate:customer.dueDate
        }));
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  searchCustomer(event: any) {
    let query = event.query.toLowerCase();
    this.filteredCustomers = this.customers.filter(customer =>
      customer.name.toLowerCase().includes(query)
    );
  }

  onCustomerSelect() {
    if (this.selectedCustomer) {
      const currentDate = new Date().toISOString().split('T')[0]; // Fetch current date in YYYY-MM-DD format
      this.paymentForm.patchValue({
        roomNumber: this.selectedCustomer.roomNumber,
        email: this.selectedCustomer.email,
        phone: this.selectedCustomer.phone,
        amount: this.selectedCustomer.rentAmount,
        dueDate: this.selectedCustomer.dueDate ? this.selectedCustomer.dueDate.split('T')[0] : currentDate
      });
    }
  }  

  sendPayment() {
    if (this.paymentForm.valid) {
      const data = this.paymentForm.value;
      data.name = this.selectedCustomer.name; // Add this line
      console.log(data);
      this.customerService.sendPayment(data).subscribe({
        next: (res) => {
          console.log('Payment Sent', res);
          alert('Payment Sent Successfully');
        },
        error: (err) => {
          console.error(err);
          alert('Failed to Send Payment');
        }
      });
    } else {
      alert('Please fill out all fields');
    }
  }
  
}
