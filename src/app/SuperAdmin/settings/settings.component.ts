import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SuperadminService } from 'src/app/services/superadmin/superadmin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  passwordForm!: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private settingService: SuperadminService) { }

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      userName: ['', Validators.required], // Ensure username is provided
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.passwordForm.valid) {
      this.settingService.changePassword(this.passwordForm.value).subscribe(
        (response) => {
          this.message = response.message;
          Swal.fire({
            title:'Success',
            text:'Password updated successfully...',
            icon:'success',
            timer:1500
          })
        },
        (error) => {
          this.message = error.error.message || 'Error updating password';
          Swal.fire({
            title:'Failed',
            text:'Please check fields...',
            icon:'error',
          })
        }
      );
    }
  }
}
