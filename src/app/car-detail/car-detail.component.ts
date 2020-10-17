import { Component, OnInit } from '@angular/core';
import { ICar } from '../ICar';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CarserviceService } from '../carservice.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  car: ICar;
  id: string;
  cate: string;
  available: Boolean;
  constructor(private carservice: CarserviceService, private Aroute: ActivatedRoute, private router: Router, private cookiservice: CookieService) { }

  ngOnInit(): void {
    if (!this.cookiservice.check('email_id')) {
      this.router.navigate(['/login']);
    }
    this.Aroute.params.subscribe((param) => this.getData(param.id));
  }
  getData(id: string) {
    this.id = id;
    this.carservice.getCarDetail(this.id).subscribe(rescar => {
      this.car = rescar[0];
      if (this.car === undefined) {
        this.router.navigate(['/cars/all']);
      }
      this.available = this.car.available;
      this.getCategory(this.car.category);
      // console.log(this.car);
    })
  }

  booking(id: String) {
    this.carservice.setCar(this.car);
    this.router.navigate(['carBooking', id])
  }
  getCategory(cate: String) {
    switch (cate) {
      case 'ec':
        this.cate = "Economy Cars";
        break;
      case 'cc':
        this.cate = "Compact Cars";
        break;
      case 'ms':
        this.cate = "Medium Size Cars";
        break;
      case 'fs':
        this.cate = "Full Size Cars";
        break;
      case 'pc':
        this.cate = "Premium Cars";
        break;
      case 'lc':
        this.cate = "Luxury Cars";
        break;
      case 'suv':
        this.cate = "SUV Cars";
        break;
      default:
        this.cate = "All";
    }
  }

}
