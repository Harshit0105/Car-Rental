import { Component, OnInit } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import { UserService } from '../user.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpResponse } from '@angular/common/http';
import { User } from '../IUser';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  email_id: String;
  password: String;
  user: User;
  userMatch: boolean;
  submitted: boolean;

  constructor(
    private fb: FormBuilder,
    private userservice: UserService,
    private router: Router,
    private cookieservice: CookieService,
    private auth: AuthService,
  ) { }
  ngOnInit(): void {
    this.submitted = false;
    this.userMatch = true;
    this.myForm = this.fb.group({
      password: ['', Validators.required],
      email_id: ['', [Validators.required, Validators.email]]
    });

    //Password visibility
    const togglePassword = document.querySelector('#togglePassword');
    const password = document.querySelector('#password');

    togglePassword.addEventListener('click', function (e) {
      const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
      password.setAttribute('type', type);
      this.classList.toggle('fa-eye-slash');
    });
    //
  }

  get myFormControl() {
    return this.myForm.controls;
  }

  login() {
    this.submitted = true;
    if (this.myForm.valid) {
      this.userservice.tryLogin(this.email_id, this.password).subscribe((res) => {
        if (res != null && res.status != 400) {
          this.user = res;
          this.userMatch = true;
          this.checkResponse(this.user);
        }
        else {
          this.userMatch = false;
          console.log("Not available");
        }
      });
    }
    else {

    }
  }

  checkResponse(user: User) {
    this.cookieservice.set("email_id", user.email_id.toString());
    this.cookieservice.set("role", user.role.toString());
    if (user.role == "admin") {
      this.router.navigate(['/admin']);
    }
    else {
      this.auth.login(user);
      this.router.navigate(['/home']);
    }
  }
}
