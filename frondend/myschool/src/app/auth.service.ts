import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const URL = 'http://localhost:8080/auth/';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  public registerUser(register: any) {
    return this.http.post(URL + 'signup', register);
  }
  public loginUser(login: any) {
    return this.http.post(URL + 'login', login);
  }
  public registerStaffUser(userStaff: any) {
    return this.http.post(URL + 'signupStaff', userStaff);
  }
}
