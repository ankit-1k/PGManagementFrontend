import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomermgmtService } from 'src/app/services/CustomerMgmt/customermgmt.service';
import { RoomsService } from 'src/app/services/RoomMgmt/rooms.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-newcustomer',
  templateUrl: './newcustomer.component.html',
  styleUrls: ['./newcustomer.component.scss'],
})
export class NewcustomerComponent implements OnInit {
  customerForm!: FormGroup;
  currentStep = 0;

  steps = [
    { label: 'Basic Information' },
    { label: 'Address Details' },
    { label: 'ID Proof & Documents' },
    { label: 'PG Stay Details' },
  ];

  gender = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
  ];

  city = [
    { label: 'Odisha', value: 'Odisha' },
    { label: 'TS', value: 'TS' },
  ];

  roomType = [
    { label: 'Single', value: 'Single' },
    { label: 'Double', value: 'Double' },
  ];
  availabilityMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private customerService: CustomermgmtService,
    private roomService: RoomsService
  ) {}

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      name: ['John Doe', Validators.required],
      dob: ['1995-05-20', Validators.required],
      gender: ['Male', Validators.required],
      phone: [
        '9876543210',
        [Validators.required, Validators.pattern(/^\d{10}$/)],
      ],
      email: ['johndoe@example.com', [Validators.required, Validators.email]],
      permanentAddress: ['123 Main Street', Validators.required],
      currentAddress: ['456 Elm Street', Validators.required],
      city: ['New York', Validators.required],
      state: ['NY', Validators.required],
      pincode: ['100001', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      idProof: ['Aadhar123456', Validators.required],
      profilePic: [null, Validators.required],
      emergencyName: ['Jane Doe', Validators.required],
      emergencyContact: [
        '9876543200',
        [Validators.required, Validators.pattern(/^\d{10}$/)],
      ],
      guardianDetails: [''],
      checkInDate: ['2025-03-01', Validators.required],
      roomNumber: ['A101', Validators.required],
      bedNumber: ['1', Validators.required],
      roomType: ['Single', Validators.required],
      rentAmount: ['6000', Validators.required],
      securityDeposit: ['1000', Validators.required],
    });
  }

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  imagePreview: any = {
    idProof: null,
    profilePic: null,
  };

  onFileSelect(event: any, fileType: string) {
    const file = event.target.files[0];
    if (file) {
      // Set file in form correctly
      this.customerForm.get(fileType)?.setValue(file);

      // Show image preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview[fileType] = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  submitForm() {
    if (this.customerForm.invalid) {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill out all required fields',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    const formData = new FormData();

    // Append all form fields except files
    Object.keys(this.customerForm.value).forEach((key) => {
      if (key !== 'idProof' && key !== 'profilePic') {
        formData.append(key, this.customerForm.value[key]);
      }
    });

    // Ensure files are correctly appended
    const idProofFile = this.customerForm.get('idProof')?.value;
    if (idProofFile instanceof File) {
      formData.append('idProof', idProofFile);
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'ID Proof is required!',
        icon: 'error',
      });
      return;
    }

    const profilePicFile = this.customerForm.get('profilePic')?.value;
    if (profilePicFile instanceof File) {
      formData.append('profilePic', profilePicFile);
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Profile Picture is required!',
        icon: 'error',
      });
      return;
    }

    this.customerService.addNewCustomer(formData).subscribe({
      next: (response) => {
        Swal.fire({
          title: 'Success!',
          text: 'Customer data has been saved successfully.',
          icon: 'success',
        });
        this.customerForm.reset();
        this.imagePreview = { idProof: null, profilePic: null }; // Reset image previews
      },
      error: (error) => {
        Swal.fire({
          title: 'Failed!',
          text: error.error?.message || 'Failed to post data',
          icon: 'error',
        });
      },
    });
  }

  checkAvailability() {
    const roomNumber = this.customerForm.get('roomNumber')?.value;

    if (!roomNumber) {
      this.availabilityMessage = 'Please enter a room number.';
      return;
    }

    this.roomService.checkRoomAvailability(roomNumber).subscribe(
      (response: any) => {
        if (response.availableBeds > 0) {
          this.availabilityMessage = `Room is available. ${response.availableBeds} beds left.`;
          Swal.fire({
            title:'Available',
            text:`Room is available. ${response.availableBeds} beds left.`,
            icon:'success',
            timer:2000
          })
        } else {
          this.availabilityMessage = 'Room is fully occupied.';
          Swal.fire({
            title:'Full',
            text:'This Room is already full...',
            icon:'warning',
            timer:2000
          })
        }
      },
      (error) => {
        this.availabilityMessage =
          error.status === 404 ? 'Room not found.' : 'Server error.';
      }
    );
  }
}
