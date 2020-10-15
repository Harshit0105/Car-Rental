import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @Input() public parentData

  constructor(private cookiservice: CookieService, private auth: AuthService) { }
  isLoged: boolean;
  ngOnInit(): void {
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
    // location.reload();
  }
}
