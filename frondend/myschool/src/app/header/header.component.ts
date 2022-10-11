import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private tokenService: TokenService, private route: Router) {}
  isLoggedIn: any;
  ngOnInit(): void {
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.dropdown-trigger');
      var instances = M.Dropdown.init(elems);
    });
  }
  removeLocalStorage() {
    console.log('removeLocalStorage');
    this.tokenService.signOut();
    this.route.navigate(['login']);
  }
  getIsLoggedIn() {
    return this.tokenService.getIsLoggedIn();
  }
  getRole() {
    return this.tokenService.getUser().roles[0];
  }
}
