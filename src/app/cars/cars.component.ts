import { Component, OnInit } from '@angular/core';
import { ICar } from '../ICar';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CarserviceService } from '../carservice.service';


@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  cars: ICar[];
  cate: String;
  constructor(private carservice: CarserviceService, private Aroute: ActivatedRoute, private router: Router, private cookiservice: CookieService) { }

  ngOnInit(): void {
    if (!this.cookiservice.check('email_id')) {
      this.router.navigate(['/login']);
    }
    this.Aroute.params.subscribe((param) => this.callService(param.cate));
  }
  callService(category: String) {
    this.carservice.getCars(category).subscribe(rescar => {
      this.cars = rescar;
      this.cars = this.cars.sort((a, b) => (a.price > b.price ? -1 : 1)).filter((a) => a.available);
    })
  }
  carDetails(car: ICar) {
    this.router.navigate(['/carDetails', car._id])
  }
}
