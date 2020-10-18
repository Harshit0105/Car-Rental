import { Component, OnInit } from '@angular/core';
import { ICar } from '../ICar';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { TripService } from '../trip.service';
import { ITrip } from '../ITrip';
import { CarserviceService } from '../carservice.service';
import { UserService } from '../user.service';
import { User } from '../IUser';

@Component({
  selector: 'app-admin-trip',
  templateUrl: './admin-trip.component.html',
  styleUrls: ['./admin-trip.component.css']
})


export class AdminTripComponent implements OnInit {
  trips: ITrip[];
  result: Object[];
  constructor(private userservice: UserService, private cookieservice: CookieService, private carservice: CarserviceService, private tripservice: TripService, private router: Router) { }

  ngOnInit(): void {
    this.result = new Array();
    if (!this.cookieservice.check('email_id') || this.cookieservice.get('role') != "admin") {
      this.router.navigate(['']);
    }
    else {
      this.tripservice.getAllTrips().subscribe((res) => {
        this.trips = res;
        this.trips.forEach(element => {
          this.carservice.getCarDetail(element.car_id).subscribe((res) => {
            var car = res[0] as ICar;
            this.userservice.getUserById(element.user_id).subscribe((resUser) => {
              this.result.push({ 'trip': element, 'carname': car.name, 'username': resUser[0].username });
            })
          });
        });
      })
    }
  }

}
