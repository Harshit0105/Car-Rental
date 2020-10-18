import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth.service';
import { User } from '../IUser';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private router: Router, private cookiservice: CookieService, private auth: AuthService, private userservice: UserService) { }
  isLoged: boolean;
  isAdmin: boolean;
  ngOnInit(): void {
    if (this.cookiservice.check('email_id')) {
      this.isLoged = true;
      if (this.cookiservice.get('role') == "admin") {
        this.isAdmin = true;
      }
      else {
        this.userservice.getUser(this.cookiservice.get('email_id')).subscribe((res) => {
          if (res == null || res.status == 400) {
            this.isLoged = false;
            this.auth.logout();
          }
          else {
            this.isAdmin = false;
            this.auth.login(res);
          }
        });
      }
    }

    this.auth.userObserver.subscribe((res) => {
      if (res == null) {
        this.isLoged = false;
      }
      else {
        this.isLoged = true;
      }
    });
  }
  myFunction() {
    var x = document.getElementById("myTopNav");
    x.classList.toggle('responsive')
  }

  logout() {
    this.cookiservice.set('email_id', null, -1);
    this.cookiservice.set('role', null, -1);
    this.cookiservice.set('user_id', null, -1);
    this.auth.logout();
    this.router.navigate(['/home']).then(() => location.reload());
  }
}
