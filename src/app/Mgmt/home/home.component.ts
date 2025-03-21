import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SuperadminService } from "src/app/services/superadmin/superadmin.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  showDialog = false;
  otp = "";
  otpSent = false;

  constructor(private otpService: SuperadminService, private router: Router) {}

  ngOnInit(): void {}

  sendOTP() {
    this.otpService.sendOTP().subscribe(
      (response: any) => {
        if (response.success) {
          alert("OTP sent successfully!");
          this.otpSent = true;
        } else {
          alert("Error sending OTP!");
        }
      },
      () => alert("Failed to send OTP!")
    );
  }  

  verifyOTP() {
    this.otpService.verifyOTP(this.otp).subscribe(
      (response: any) => {
        if (response.success && response.token && this.isValidToken(response.token)) {
          localStorage.setItem("token", response.token);
          alert("OTP verified successfully!");
          this.showDialog = false;
          this.router.navigate(["/admin/superadmin"]);
        } else {
          alert("Invalid OTP or token!");
        }
      },
      () => alert("Failed to verify OTP!")
    );
  }
  
  // ✅ Validate token using regex or decode
  isValidToken(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
      return !!(payload && payload.email); // Ensure email exists in payload
    } catch (e) {
      return false;
    }
  }
  
}
