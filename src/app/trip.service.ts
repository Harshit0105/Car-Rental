import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITrip } from './ITrip';

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private http: HttpClient) { }
  getAllTrips(card_id: String): Observable<any> {
    return this.http.get<ITrip[]>("http://localhost:8000/getTrips/" + card_id);
  }

  addTrip(trip: ITrip): Observable<any> {
    return this.http.post<HttpResponse<any>>('http://localhost:8000/addTrip', trip, httpOptions);
  }

  getUserTrips(user_id: String): Observable<any> {
    return this.http.get<ITrip[]>("http://localhost:8000/getUserTrips/" + user_id);
  }
}
