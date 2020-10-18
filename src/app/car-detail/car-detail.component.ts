import { Component, OnInit } from '@angular/core';
import { ICar } from '../ICar';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CarserviceService } from '../carservice.service';
import { ITrip } from '../ITrip';
import { TripService } from '../trip.service';

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
  trips: ITrip[];
  start: Date;
  end: Date;
  startSelected: Boolean;
  endSelected: Boolean;
  minPick: Date = new Date();
  maxPick: Date = new Date();
  maxEndPick: Date = new Date();
  currentDate: Date = new Date();
  checked: Boolean;
  found: Boolean;
  amount: Number;
  checkout: Boolean;
  success: String;
  booked: Boolean;

  constructor(
    private carservice: CarserviceService,
    private Aroute: ActivatedRoute,
    private router: Router,
    private cookiservice: CookieService,
    private trip: TripService,
  ) {
    this.minPick.setDate(this.minPick.getDate() + 2);
    this.maxPick.setDate(this.maxPick.getDate() + 8);
    this.maxEndPick.setDate(this.maxPick.getDate() + 3);
  }

  ngOnInit(): void {
    if (!this.cookiservice.check('email_id')) {
      this.router.navigate(['/login']);
    }
    this.startSelected = false;
    this.endSelected = false;
    this.checked = false;
    this.found = true;
    this.checkout = false;
    this.success = '';
    this.booked = false;
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
    });
    this.trip.getCarTrips(id).subscribe((res) => {
      this.trips = res;
      console.log(this.trips);
    });
  }

  startPick() {
    this.startSelected = true;
    // this.maxEndPick.setDate((new Date(this.start).getDate()));
  }

  endPick() {
    this.endSelected = true;
  }

  checkTrips() {
    this.found = true;
    this.trips.forEach(element => {
      if ((this.start >= element.startDate && this.start <= element.endDate) || (this.end >= element.startDate && this.end <= element.endDate)) {
        this.found = false;
      }
      else if ((element.startDate >= this.start && element.startDate <= this.end) || (element.endDate >= this.start && element.endDate <= this.end)) {
        this.found = false;
      }
    });
    if (this.found) {
      this.amount = ((new Date(this.end).getDate()) - (new Date(this.start).getDate()) + 1) * parseInt(this.car.price.toString());
    }
    this.checked = true;
  }

  checkOut(trip: ITrip) {
    this.checkout = true;
    trip.amount = Number(this.amount);
    trip.endDate = new Date(this.end);
    trip.startDate = new Date(this.start);
    trip.car_id = this.car._id;
    trip.car_name = this.car.name;
    trip.user_id = this.cookiservice.get('user_id');
    this.trip.addTrip(trip).subscribe((res) => {
      if (res['message'] != "Trip added successfully") {
        this.success = "Fail to book car, Please try again later!";
        this.booked = true;
      }
      else {
        this.success = "Your booking was confirmed.";
        this.booked = true;
      }
    });
  }

  again() {
    this.start = null;
    this.end = null;
    this.booked = false;
    this.success = "";
    this.checkout = false;
    this.checked = false;
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
