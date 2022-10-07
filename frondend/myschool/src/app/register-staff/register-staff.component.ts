import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-register-staff',
  templateUrl: './register-staff.component.html',
  styleUrls: ['./register-staff.component.css'],
})
export class RegisterStaffComponent implements OnInit {
  emailIdPattern: string | RegExp = '^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$';
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: Router
  ) {}

  ngOnInit(): void {}

  register(registerStaff: any) {}

  public frmStaffRegister = this.fb.group({
    emailId: this.fb.control('', [
      Validators.required,
      Validators.pattern(this.emailIdPattern),
    ]),
    password: this.fb.control('', [Validators.required]),
  });
  get emailId() {
    return this.frmStaffRegister.get('emailId') as FormControl;
  }
  get password() {
    return this.frmStaffRegister.get('password') as FormControl;
  }
  clearForm() {
    this.frmStaffRegister.reset();
  }
  registerStaff(registerStaff: any) {
    console.log(registerStaff);
    this.authService.registerStaffUser(registerStaff).subscribe(
      (response) => {
        console.log(response);
        this.route.navigate(['/login']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
