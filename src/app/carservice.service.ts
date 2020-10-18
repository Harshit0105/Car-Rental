import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICar } from './ICar';

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class CarserviceService {
  car: ICar;
  constructor(private http: HttpClient) { }

  setCar(car: ICar) {
    this.car = car
  }
  getCar() {
    return this.car;
  }
  getCars(category: String): Observable<ICar[]> {
    return this.http.get<ICar[]>("http://localhost:8000/allcars/" + category)
  }
  getCarDetail(id: String): Observable<ICar> {
    return this.http.get<ICar>("http://localhost:8000/carDetails/" + id);
  }
  addNewCar(car: ICar): Observable<any> {
    return this.http.post<HttpResponse<any>>("http://localhost:8000/addNewCar", car, httpOptions);
  }
  addCarPic(formData: FormData): Observable<any> {
    return this.http.post<HttpResponse<any>>("http://localhost:8000/addCarPic", formData);
  }
  updateCar(car: ICar): Observable<any> {
    return this.http.post<HttpResponse<any>>("http://localhost:8000/updateCar", car, httpOptions);
  }
  deleteCar(id: String): Observable<any> {
    return this.http.delete<HttpResponse<any>>("http://localhost:8000/deleteCar" + id);
  }
}
