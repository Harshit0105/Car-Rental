import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private cookiservice: CookieService, private router: Router) { }

  ngOnInit(): void {
    if (!this.cookiservice.check('email_id')) {
      this.router.navigate(['/login']);
    }
  }

}
