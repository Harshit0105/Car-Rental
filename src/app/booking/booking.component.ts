import { Component, OnInit } from '@angular/core';
import { TripService } from '../trip.service';
import { ITrip } from '../ITrip';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CarserviceService } from '../carservice.service';
import { ICar } from '../ICar';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
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
  car: ICar;
  checkout: Boolean;

  constructor(
    private carservice: CarserviceService,
    private trip: TripService,
    private router: Router,
    private cookiservice: CookieService,
    private Aroute: ActivatedRoute
  ) {
    this.minPick.setDate(this.minPick.getDate() + 1);
    this.maxPick.setDate(this.maxPick.getDate() + 7);
    this.maxEndPick.setDate(this.maxPick.getDate() + 3);
  }

  ngOnInit(): void {
    this.startSelected = false;
    this.endSelected = false;
    this.checked = false;
    this.found = true;
    this.checkout = false;
    console.log(this.minPick);
    console.log(this.maxPick);
    if (!this.cookiservice.check('email_id')) {
      this.router.navigate(['/login']);
    }
    this.Aroute.params.subscribe((param) => {
      this.getData(param.id);
      this.carservice.getCarDetail(param.id).subscribe((res) => this.car = res[0]);
    });
  }


  startPick() {
    this.startSelected = true;
    // this.maxEndPick.setDate((new Date(this.start).getDate()));
  }
  endPick() {
    this.endSelected = true;
  }
  getData(id: string) {
    this.trip.getAllTrips(id).subscribe((res) => {
      this.trips = res;
      console.log(this.trips);
    });
  }
  checkTrips() {
    this.found = true;
    this.trips.forEach(element => {
      if ((this.start >= element.startDate && this.start <= element.endDate) || (this.end >= element.startDate && this.end <= element.endDate)) {
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
    trip.user_id = this.cookiservice.get('email_id');
    this.trip.addTrip(trip);
  }
}
