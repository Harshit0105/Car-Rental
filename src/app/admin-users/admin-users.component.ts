import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../IUser';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  users: User[]

  constructor(private userservice: UserService, private cookieservice: CookieService, private router: Router) { }

  ngOnInit(): void {
    if (!this.cookieservice.check('email_id') || this.cookieservice.get('role') != "admin") {
      this.router.navigate(['']);
    }
    else {
      this.userservice.getAllUser().subscribe((res) => {
        this.users = res;
      })
    }
  }

}
