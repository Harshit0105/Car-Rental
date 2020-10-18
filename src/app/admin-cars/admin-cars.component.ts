import { Component, OnInit } from '@angular/core';
import { CarserviceService } from '../carservice.service';
import { ICar } from '../ICar';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-cars',
  templateUrl: './admin-cars.component.html',
  styleUrls: ['./admin-cars.component.css']
})
export class AdminCarsComponent implements OnInit {
  cars: ICar[];
  constructor(private cookieservice: CookieService, private carservice: CarserviceService, private router: Router) { }

  ngOnInit(): void {
    if (!this.cookieservice.check('email_id') || this.cookieservice.get('role') != "admin") {
      this.router.navigate(['']);
    }
    else {
      this.carservice.getCars("all").subscribe((res) => {
        this.cars = res;
      })
    }
  }

  delete(id: String) {
    this.cars = this.cars.filter((e) => e._id != id);
    this.carservice.deleteCar(id).subscribe((res) => console.log(res));
  }

}
