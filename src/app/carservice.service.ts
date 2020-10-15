import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICar } from './ICar';

@Injectable({
  providedIn: 'root'
})
export class CarserviceService {
  constructor(private http: HttpClient) { }
  getCars(category: String): Observable<ICar[]> {
    return this.http.get<ICar[]>("http://localhost:8000/allcars/" + category)
  }
  getCarDetail(id: String): Observable<ICar[]> {
    return this.http.get<ICar[]>("http://localhost:8000/carDetails/" + id)
  }
}
