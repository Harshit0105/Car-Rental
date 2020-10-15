import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cost-finder',
  templateUrl: './cost-finder.component.html',
  styleUrls: ['./cost-finder.component.css']
})
export class CostFinderComponent implements OnInit {

  constructor(private cookiservice: CookieService, private router: Router) { }

  ngOnInit(): void {
    if (!this.cookiservice.check('email_id')) {
      this.router.navigate(['/login']);
    }
  }
}
