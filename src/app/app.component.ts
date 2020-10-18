import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WheelUp';
  isAdmin: Boolean;
  constructor(private auth: AuthService, private cookieservice: CookieService) {
    if (this.cookieservice.check('role') && this.cookieservice.get('role') == "admin") {
      this.isAdmin = true;
    }
    else {
      this.isAdmin = false;
    }
  }
  // ngOnInit() {
  //   if (this.cookieservice.check('role') && this.cookieservice.get('role') == "admin") {
  //     this.isAdmin = true;
  //   }
  //   else {
  //     this.isAdmin = false;
  //   }
  //   this.auth.userObserver.subscribe((res) => {
  //     if (res == null) {
  //       this.isAdmin = false;
  //     }
  //     else if (this.cookieservice.check('role')) {
  //       if (this.cookieservice.get('role') == "admin") {
  //         this.isAdmin = true;
  //       }
  //       else {
  //         this.isAdmin = false;
  //       }
  //     }
  //     else {
  //       this.isAdmin = false;
  //     }
  //   })
  // }
}
