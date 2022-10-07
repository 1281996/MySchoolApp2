import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyschoolService } from '../myschool.service';

@Component({
  selector: 'app-details-parent',
  templateUrl: './details-parent.component.html',
  styleUrls: ['./details-parent.component.css'],
})
export class DetailsParentComponent implements OnInit {
  userId: any;
  userDetails: any;
  comment: any;
  constructor(
    private route: ActivatedRoute,
    private schoolService: MyschoolService
  ) {
    this.route.queryParams.forEach((val: any) => {
      this.userId = val.user;
      console.log(this.userId);
    });
    schoolService.getUserData(this.userId).subscribe((res: any) => {
      this.userDetails = res;
    });
  }

  ngOnInit(): void {}
  publish(status: any, user: any, comment: any) {
    console.log(comment);
    user.comment = comment;
    this.schoolService.acceptorReject(status, user).subscribe(
      (response: any) => {},
      (error) => {
        console.log(error);
      }
    );
  }
}
