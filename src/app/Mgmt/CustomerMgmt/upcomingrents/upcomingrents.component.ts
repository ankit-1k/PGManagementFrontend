import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CustomermgmtService } from 'src/app/services/CustomerMgmt/customermgmt.service';

@Component({
  selector: 'app-upcomingrents',
  templateUrl: './upcomingrents.component.html',
  styleUrls: ['./upcomingrents.component.scss'],
})
export class UpcomingrentsComponent implements OnInit {
  customers: any[] = [];
  upcomingRents: any[] = [];

  constructor(private customerMgmtService: CustomermgmtService) {}

  ngOnInit(): void {
    this.allCustomerList();
  }

  allCustomerList() {
    this.customerMgmtService.allCustomerList().subscribe({
      next: (response) => {
        this.customers = response;
        this.calculateUpcomingRents();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  updateDueDate(customer: any) {
    const formData = new FormData();
    formData.append('name', customer.name);
    formData.append('phone', customer.phone);
    formData.append('dueDate', customer.dueDate); // Add dueDate

    if (customer.idProof) {
      formData.append('idProof', customer.idProof);
    }
    if (customer.profilePic) {
      formData.append('profilePic', customer.profilePic);
    }

    this.customerMgmtService.updateCustomer(customer._id, formData).subscribe({
      next: (response) => {
        console.log('Customer updated:', response);
      },
      error: (error) => {
        console.error('Update failed:', error);
      },
    });
  }

  calculateUpcomingRents() {
    const today = moment().startOf('day'); // Today's date (ignoring time)
    this.upcomingRents = [];

    this.customers.forEach((customer) => {
      const checkInDate = moment(customer.checkInDate);
      let dueDate = checkInDate.clone();

      while (dueDate.isBefore(today.clone().add(1, 'year'))) {
        // Limit to 1 year
        dueDate = dueDate.clone().add(1, 'month');

        // Adjust for shorter months (like February)
        const lastDayOfMonth = dueDate.clone().endOf('month').date();
        if (checkInDate.date() > lastDayOfMonth) {
          dueDate.date(lastDayOfMonth);
        }

        // **Only add rent due today**
        if (dueDate.isSame(today, 'day')) {
          this.upcomingRents.push({
            name: customer.name,
            phone: customer.phone,
            email: customer.email,
            checkInDate: checkInDate.format('DD MMM YYYY'),
            dueDate: dueDate.format('DD MMM YYYY'),
          });
          customer.dueDate = dueDate.format('YYYY-MM-DD'); // Add dueDate to customer object
          this.updateDueDate(customer);
        }
        // Stop unnecessary calculations
        if (dueDate.isAfter(today.clone().add(100, 'years'))) break;
      }
    });
  }

  // contact customers through call and whatsapp
  phoneCall(phone: string) {
    window.location.href = `tel:${phone}`;
  }
  
  sendWhatsAppMessage(phone: string, name: string) {
    const message = `Hello ${name}, your rent is due today. Kindly make the payment.`;
    const whatsappURL = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  }
  
}
