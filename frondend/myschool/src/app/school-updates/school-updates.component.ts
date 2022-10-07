import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MyschoolService } from '../myschool.service';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-school-updates',
  templateUrl: './school-updates.component.html',
  styleUrls: ['./school-updates.component.css'],
})
export class SchoolUpdatesComponent implements OnInit {
  createCircularFlag: boolean = false;
  viewCircularFlag: boolean = true;
  acknoledgeFlag: boolean = false;

  allCirculars: any;
  acknowledgeObj: any = {
    email: '',
  };
  acknowledgeList: any;
  constructor(
    private fb: FormBuilder,
    private myschoolService: MyschoolService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.myschoolService.getAlleCircular().subscribe(
      (response: any) => {
        console.log(response);
        this.allCirculars = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  public frmCircular = this.fb.group({
    notificationDate: this.fb.control('', [Validators.required]),
    information: this.fb.control('', [Validators.required]),
    postedBy: this.fb.control('', [Validators.required]),
  });
  get notificationDate() {
    return this.frmCircular.get('notificationDate') as FormControl;
  }
  get information() {
    return this.frmCircular.get('information') as FormControl;
  }
  get postedBy() {
    return this.frmCircular.get('postedBy') as FormControl;
  }
  clearForm() {
    this.frmCircular.reset();
  }
  showCreateCircular() {
    this.createCircularFlag = true;
    this.acknoledgeFlag = false;
    this.viewCircularFlag = false;
  }
  createCircular(circular: any) {
    this.myschoolService.createCircular(circular).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  displayCirculars() {
    this.createCircularFlag = false;
    this.acknoledgeFlag = false;
    this.viewCircularFlag = true;
  }
  getRole() {
    return this.tokenService.getUser().roles[0];
  }
  acknowledge(circularId: any) {
    this.acknowledgeObj.email = this.tokenService.getUser().email;
    this.myschoolService.acknowledge(circularId, this.acknowledgeObj).subscribe(
      (res: any) => {},
      (error: any) => {}
    );
  }
  displayAcknowledge() {
    this.createCircularFlag = false;
    this.acknoledgeFlag = true;
    this.viewCircularFlag = false;
    this.myschoolService.getAllAcknowledgedetails().subscribe(
      (res: any) => {
        console.log(res);
        this.acknowledgeList = res;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
