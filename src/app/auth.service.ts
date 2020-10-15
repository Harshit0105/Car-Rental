import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from './IUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  userObserver: Subject<any> = new Subject();
  constructor() { }
  getUser() {
    return this.user;
  }
  login(user1: User) {
    this.user = user1;
    this.userObserver.next(this.user);
    return this.userObserver.asObservable();
  }
  logout() {
    this.user = null;
    this.userObserver.next(this.user);
    return this.userObserver.asObservable();
  }

}
