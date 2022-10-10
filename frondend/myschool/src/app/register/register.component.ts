import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

import * as M from 'materialize-css';
import { Route, Router } from '@angular/router';
import { NotificationService } from '../notification.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  countryStatesList: any[] = ['India', 'USA'];

  indiaStates: any[] = ['AndhraPradesh', 'TamilNadu', 'Karnataka'];
  usaStates: any[] = ['SF', 'CL', 'AT'];
  statesList: any[];
  phoneNumberPattern: string | RegExp = '^[0-9]{10}$';
  zipCodePattern: string | RegExp = '^[0-9]{6}$';
  emailIdPattern: string | RegExp = '^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$';
  namePattern: string | RegExp = '^[a-zA-Z][a-zA-Z\\s]+$';
  stuRegNoPattern: string | RegExp =
    '^[R]+-([0-9a-zA-Z]{3})+.([0-9a-zA-Z]{3})$';
  cityPattern: string | RegExp = '^[a-zA-Z]+$';
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: Router,
    private notification: NotificationService
  ) {
    this.statesList = this.indiaStates;
  }

  ngOnInit(): void {
    //date pickerjs code
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.datepicker');
      // console.log(elems);
      var instances = M.Datepicker.init(elems);
      // console.log(instances);
    });
    //select js code
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('select');
      var instances = M.FormSelect.init(elems);
      //console.log(instances);
    });
  }

  public frmRegister = this.fb.group({
    emailId: this.fb.control('', [
      Validators.required,
      Validators.pattern(this.emailIdPattern),
    ]),
    password: this.fb.control('', [Validators.required]),
    parentName: this.fb.control('', [
      Validators.required,
      Validators.pattern(this.namePattern),
    ]),
    studentName: this.fb.control('', [
      Validators.required,
      Validators.pattern(this.namePattern),
    ]),
    studentRegNo: this.fb.control('', [
      Validators.required,
      Validators.pattern(this.stuRegNoPattern),
    ]),
    address: this.fb.control('', [Validators.required]),
    country: this.fb.control('', [Validators.required]),
    state: this.fb.control(''),
    city: this.fb.control('', [
      Validators.required,
      Validators.pattern(this.cityPattern),
    ]),
    zipCode: this.fb.control('', [
      Validators.required,
      Validators.pattern(this.zipCodePattern),
    ]),
    primaryContactName: this.fb.control('', [Validators.required]),
    primaryContactPhoneNo: this.fb.control('', [
      Validators.required,
      Validators.pattern(this.phoneNumberPattern),
    ]),
    secondaryContactName: this.fb.control('', [Validators.required]),
    secondaryContactPhoneNo: this.fb.control('', [
      Validators.required,
      Validators.pattern(this.phoneNumberPattern),
    ]),
    age: this.fb.control('', [Validators.required, Validators.min(4)]),
    dateOfBirth: this.fb.control('', [Validators.required]),
  });

  get emailId() {
    return this.frmRegister.get('emailId') as FormControl;
  }
  get password() {
    return this.frmRegister.get('password') as FormControl;
  }
  get parentName() {
    return this.frmRegister.get('parentName') as FormControl;
  }
  get studentName() {
    return this.frmRegister.get('studentName') as FormControl;
  }
  get country() {
    return this.frmRegister.get('country') as FormControl;
  }
  get state() {
    return this.frmRegister.get('state') as FormControl;
  }
  get city() {
    return this.frmRegister.get('city') as FormControl;
  }
  get zipCode() {
    return this.frmRegister.get('zipCode') as FormControl;
  }
  get primaryContactName() {
    return this.frmRegister.get('primaryContactName') as FormControl;
  }
  get primaryContactPhoneNo() {
    return this.frmRegister.get('primaryContactPhoneNo') as FormControl;
  }
  get secondaryContactPhoneNo() {
    return this.frmRegister.get('secondaryContactPhoneNo') as FormControl;
  }
  get secondaryContactName() {
    return this.frmRegister.get('secondaryContactName') as FormControl;
  }
  get address() {
    return this.frmRegister.get('address') as FormControl;
  }
  get studentRegNo() {
    return this.frmRegister.get('studentRegNo') as FormControl;
  }
  get age() {
    return this.frmRegister.get('age') as FormControl;
  }
  get dateOfBirth() {
    return this.frmRegister.get('dateOfBirth') as FormControl;
  }

  countryChange(countryEvent: any) {
    console.log(countryEvent.target.value);
    if (countryEvent.target.value == 'India') {
      this.statesList = this.indiaStates;
    } else {
      console.log('else');
      this.statesList = this.usaStates;
    }

    console.log(this.statesList);
  }
  register(registerObj: any) {
    console.log(registerObj);
    this.authService.registerUser(registerObj).subscribe(
      (response) => {
        console.log(response);
        this.notification.successNotification(
          'Registered Succesfully',
          registerObj.emailId
        );
        this.route.navigate(['/login']);
      },
      (error) => {
        console.log(error);
        this.notification.successNotification(
          'Something Went Wrong',
          registerObj.emailId
        );
      }
    );
  }
  clearForm() {
    this.frmRegister.reset();
  }
  calculateAge(event: any) {
    console.log(event.target.value);
  }
}
