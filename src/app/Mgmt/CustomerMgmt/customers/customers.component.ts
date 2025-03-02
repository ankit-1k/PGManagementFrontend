import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomermgmtService } from 'src/app/services/CustomerMgmt/customermgmt.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  customers: any[] = [];
  editDialog: boolean = false;
  editForm: FormGroup;
  selectedCustomerId: string = '';
  selectedFiles: { idProof?: File; profilePic?: File } = {};

  constructor(private customerMgmtService: CustomermgmtService, private fb: FormBuilder) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required],
      bedNumber: ['', Validators.required],
      rentAmount: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.allCustomerList();
  }

  allCustomerList() {
    this.customerMgmtService.allCustomerList().subscribe({
      next: response => {
        this.customers = response;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  openEditDialog(customer: any) {
    this.selectedCustomerId = customer._id;
    this.editForm.patchValue({
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
      roomNumber: customer.roomNumber,
      bedNumber: customer.bedNumber,
      rentAmount: customer.rentAmount
    });
    this.editDialog = true;
  }

  onFileSelect(event: any, field: 'idProof' | 'profilePic') {
    if (event.target.files.length > 0) {
      this.selectedFiles[field] = event.target.files[0];
    }
  }

  updateCustomer() {
    const formData = new FormData();
    formData.append('name', this.editForm.value.name);
    formData.append('phone', this.editForm.value.phone);
    formData.append('email', this.editForm.value.email);
    formData.append('roomNumber', this.editForm.value.roomNumber);
    formData.append('bedNumber', this.editForm.value.bedNumber);
    formData.append('rentAmount', this.editForm.value.rentAmount);

    if (this.selectedFiles.idProof) {
      formData.append('idProof', this.selectedFiles.idProof);
    }
    if (this.selectedFiles.profilePic) {
      formData.append('profilePic', this.selectedFiles.profilePic);
    }

    this.customerMgmtService.updateCustomer(this.selectedCustomerId, formData).subscribe({
      next: () => {
        this.editDialog = false;
        this.allCustomerList();
      },
      error: error => {
        console.error('Update failed:', error);
      }
    });
  }

  confirmDelete(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to undo this action!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteCustomer(id);
      }
    });
  }

  deleteCustomer(id: string) {
    this.customerMgmtService.deleteCustomer(id).subscribe({
      next: () => {
        Swal.fire('Deleted!', 'The customer has been removed.', 'success');
        Swal.fire({
          title:'Deleted!',
          text:'The customer has been removed.',
          icon:'success',
          timer:1000
        })
        this.allCustomerList(); // Refresh list
      },
      error: error => {
        Swal.fire('Error!', 'Failed to delete the customer.', 'error');
        console.error(error);
      }
    });
  }
}
