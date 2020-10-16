import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from './IUser'
import { Observable, throwError, of } from 'rxjs';
import { mergeMap, switchMap, retry, map, catchError, filter, scan, delay } from 'rxjs/operators';
import { Type } from '@angular/compiler';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { timer } from 'rxjs';

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _url = "http://localhost:8000/";
  constructor(private http: HttpClient) { }

  getUser(email_id: String): Observable<any> {
    return this.http.get<User>(this._url + "findUser/" + email_id);
  }
  tryLogin(email_id: String, password: String): Observable<any> {
    return this.http.get<User>(this._url + "login/" + email_id + "/" + password)
  }
  findUser(email_id: String): Observable<any> {
    return this.http.get<User>(this._url + "findUser/" + email_id)
  }
  trySignUp(user: User): Observable<any> {
    return this.http.post<any>(this._url + "addUser", user, httpOptions);
  }
  uploadProfilePic(formData: FormData): Observable<any> {
    return this.http.post<HttpResponse<any>>(this._url + "api/uploadProfile", formData);
  }
  updateProfile(user: User): Observable<any> {
    return this.http.post<HttpResponse<any>>(this._url + "updateProfile", user, httpOptions);
  }
}
