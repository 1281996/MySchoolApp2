import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyschoolService } from '../myschool.service';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  parentId: any;
  roleName: any;

  phoneNumberPattern: string | RegExp = '^[0-9]{10}$';
  zipCodePattern: string | RegExp = '^[0-9]{6}$';
  emailIdPattern: string | RegExp = '^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$';
  namePattern: string | RegExp = '^[a-zA-Z][a-zA-Z\\s]+$';
  stuRegNoPattern: string | RegExp =
    '^[R]+-([0-9a-zA-Z]{3})+.([0-9a-zA-Z]{3})$';
  cityPattern: string | RegExp = '^[a-zA-Z]+$';
  resParent: any = null;
  userList: any;
  clickedUser: any;
  display = 'none';
  constructor(
    private tokenService: TokenService,
    private mySchoolService: MyschoolService,
    private fb: FormBuilder,
    private route: Router
  ) {}

  ngOnInit(): void {
    //get role name
    this.roleName = this.tokenService.getUser().roles[0];
    this.parentId = this.tokenService.getUser().id;

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

    //get User data by id
    this.mySchoolService.getUserData(this.parentId).subscribe((res: any) => {
      console.log(res);
      this.resParent = res;
    });
    //get all user data
    this.mySchoolService.getAllUserData().subscribe((res: any) => {
      console.log(res);
      this.userList = res;
    });
  }
  getRole() {
    return this.tokenService.getUser().roles[0];
  }
  public frmUpdate = this.fb.group({
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
    country: this.fb.control({ value: '', disabled: true }, [
      Validators.required,
    ]),
    state: this.fb.control({ value: '', disabled: true }, [
      Validators.required,
    ]),
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
    return this.frmUpdate.get('emailId') as FormControl;
  }
  get password() {
    return this.frmUpdate.get('password') as FormControl;
  }
  get parentName() {
    return this.frmUpdate.get('parentName') as FormControl;
  }
  get studentName() {
    return this.frmUpdate.get('studentName') as FormControl;
  }

  get city() {
    return this.frmUpdate.get('city') as FormControl;
  }
  get country() {
    return this.frmUpdate.get('country') as FormControl;
  }
  get state() {
    return this.frmUpdate.get('state') as FormControl;
  }
  get zipCode() {
    return this.frmUpdate.get('zipCode') as FormControl;
  }
  get primaryContactName() {
    return this.frmUpdate.get('primaryContactName') as FormControl;
  }
  get primaryContactPhoneNo() {
    return this.frmUpdate.get('primaryContactPhoneNo') as FormControl;
  }
  get secondaryContactPhoneNo() {
    return this.frmUpdate.get('secondaryContactPhoneNo') as FormControl;
  }
  get secondaryContactName() {
    return this.frmUpdate.get('secondaryContactName') as FormControl;
  }
  get address() {
    return this.frmUpdate.get('address') as FormControl;
  }
  get studentRegNo() {
    return this.frmUpdate.get('studentRegNo') as FormControl;
  }
  get age() {
    return this.frmUpdate.get('age') as FormControl;
  }
  get dateOfBirth() {
    return this.frmUpdate.get('dateOfBirth') as FormControl;
  }
  clearForm() {}

  update(update: any) {
    console.log(update);
    //diabled fileds
    update.country = this.resParent.country;
    update.state = this.resParent.state;
    //diabled fileds
    this.mySchoolService.updateUser(update).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  seeAllDetails(userDetails: any) {
    console.log('seeAllDetails');
    console.log(userDetails);
    this.clickedUser = userDetails;
    this.route.navigate(['/parentDetails'], {
      queryParams: { user: userDetails.id },
    });
  }
}
