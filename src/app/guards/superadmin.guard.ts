import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class SuperadminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem("token");

    if (!token || !this.isValidToken(token)) {
      localStorage.removeItem("token"); // Remove invalid token
      this.router.navigate(["/login"]);
      return false;
    }
    return true;
  }

  private isValidToken(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return !!(payload && payload.email); // Ensure token contains email
    } catch (e) {
      return false;
    }
  }
}
