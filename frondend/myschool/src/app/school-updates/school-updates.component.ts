import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DateValidator } from '../DateValidator';
import { MyschoolService } from '../myschool.service';
import { NotificationService } from '../notification.service';
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
    private tokenService: TokenService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.myschoolService.getAlleCircular(this.getEmailId()).subscribe(
      (response: any) => {
        console.log(response);
        this.allCirculars = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  // new DatePipe().transform(myDate, 'yyyy-dd-MM');
  public frmCircular = this.fb.group({
    notificationDate: this.fb.control('', [
      Validators.required,
      DateValidator.notificationDateValidator(),
    ]),
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
    this.myschoolService.createCircular(circular, this.getEmailId()).subscribe(
      (response: any) => {
        console.log(response);
        this.notification.successNotification(
          'Circular Created',
          circular.emailId
        );
        this.createCircularFlag = false;
        this.acknoledgeFlag = false;
        this.viewCircularFlag = true;
      },
      (error: any) => {
        console.log(error);
        this.notification.errorNotification(
          'Circular Not Created..Something went wrong',
          circular.emailId
        );
      }
    );
  }
  displayCirculars() {
    this.createCircularFlag = false;
    this.acknoledgeFlag = false;
    this.viewCircularFlag = true;
    this.myschoolService.getAlleCircular(this.getEmailId()).subscribe(
      (response: any) => {
        console.log(response);
        this.allCirculars = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  getRole() {
    return this.tokenService.getUser().roles[0];
  }
  acknowledge(circularId: any) {
    this.acknowledgeObj.email = this.tokenService.getUser().email;
    this.myschoolService.acknowledge(circularId, this.acknowledgeObj).subscribe(
      (res: any) => {
        this.notification.successNotification(
          res.msg,
          this.acknowledgeObj.email
        );
      },
      (error: any) => {
        this.notification.errorNotification(
          'acknowledge  Not sent',
          this.acknowledgeObj.email
        );
      }
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
  getEmailId() {
    return this.tokenService.getUser().email;
  }
}
