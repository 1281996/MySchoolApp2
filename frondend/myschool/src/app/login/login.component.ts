import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import { NotificationService } from '../notification.service';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  emailIdPattern: string | RegExp = '^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$';
  public isLoggedIn: any = false;
  roles: any = [];
  constructor(
    public authService: AuthService,
    public tokenService: TokenService,
    private fb: FormBuilder,
    private route: Router,
    private notication: NotificationService
  ) {
    if (this.tokenService.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenService.getUser().roles;
    }
  }

  ngOnInit(): void {}
  public frmLogin = this.fb.group({
    emailId: this.fb.control('', [
      Validators.required,
      Validators.pattern(this.emailIdPattern),
    ]),
    password: this.fb.control('', [Validators.required]),
  });
  get emailId() {
    return this.frmLogin.get('emailId') as FormControl;
  }
  get password() {
    return this.frmLogin.get('password') as FormControl;
  }
  clearForm() {
    this.frmLogin.reset();
  }
  login(loginObj: any) {
    this.authService.loginUser(loginObj).subscribe(
      (response: any) => {
        console.log(response);
        this.tokenService.saveToken(response.token);
        this.tokenService.saveUser(response);
        this.tokenService.saveIsLoggedIn(true);
        this.isLoggedIn = true;
        this.roles = this.tokenService.getUser().roles;
        this.notication.successNotification(
          'Logged in Successfully',
          this.tokenService.getUser().email
        );
        this.route.navigate(['/home']);
      },
      (error) => {
        console.log(error.error);
        this.notication.errorNotification(loginObj.emailId, 'Bad Credentails');
      }
    );
  }
}
