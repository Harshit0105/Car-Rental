import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth.service';
import { User } from '../IUser';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private cookiservice: CookieService, private auth: AuthService, private userservice: UserService) { }
  isLoged: boolean;
  ngOnInit(): void {
    if (this.cookiservice.check('email_id')) {
      this.isLoged = true;
      this.userservice.getUser(this.cookiservice.get('email_id')).subscribe((res) => {
        if (res == null || res.status == 400) {
          this.isLoged = false;
          this.auth.logout();
        }
        else {
          this.auth.login(res);
        }
      });
    }

    this.auth.userObserver.subscribe((res) => {
      if (res == null) {
        this.isLoged = false;
      }
      else {
        this.isLoged = true;
      }
    })
  }
  myFunction() {
    var x = document.getElementById("myTopNav");
    x.classList.toggle('responsive')
  }

  logout() {
    this.cookiservice.set('email_id', null, -1);
    this.cookiservice.set('role', null, -1);
    this.auth.logout();
    location.reload();
  }
}
