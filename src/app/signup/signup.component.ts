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
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  submitted: boolean;
  myForm: FormGroup;
  username: String;
  email_id: String;
  password: String;
  phoneno: Number;
  Cpassword: String;
  gender: String;
  userMatch: Boolean;

  constructor(
    private fb: FormBuilder,
    private userservice: UserService,
    private router: Router,
    private cookieservice: CookieService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.submitted = false;
    this.userMatch = false;
    this.gender = "Male";
    this.myForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', Validators.required],
      email_id: ['', [Validators.required, Validators.email]],
      phoneno: ['', Validators.required],
      Cpassword: ['', Validators.required],
      gender: ['', Validators.required],
    }, { validators: this.passwordConfirming });

    //Password Visibility
    const togglePassword = document.querySelector('#togglePassword');
    const toggleCoPassword = document.querySelector('#toggleCoPassword');
    const password = document.querySelector('#password');
    const Copassword = document.querySelector('#Cpassword');

    togglePassword.addEventListener('click', function (e) {
      const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
      password.setAttribute('type', type);
      this.classList.toggle('fa-eye-slash');
    });

    toggleCoPassword.addEventListener('click', function (e) {
      const type = Copassword.getAttribute('type') === 'password' ? 'text' : 'password';
      Copassword.setAttribute('type', type);
      this.classList.toggle('fa-eye-slash');
    });
  }


  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('Cpassword').value) {
      return { invalid: true };
    }
  }
  get myFormControl() {
    return this.myForm.controls;
  }

  signUp(user: User) {
    this.submitted = true;
    if (this.myForm.valid) {
      this.userservice.findUser(this.email_id).subscribe((res) => {
        if (res != null) {
          if (res.status != 400) {
            this.userMatch = true;
          }
        }
        else {
          this.createUser(user);
        }
      });
    }
    else {
      console.log("Invalid");
    }
  }

  createUser(user: User) {
    this.userservice.trySignUp(user).subscribe((res: HttpResponse<any>) => this.login(res, user));
  }

  login(res: HttpResponse<any>, user: User) {
    if (res['message'] == "User added successfully") {
      this.cookieservice.set('email_id', this.email_id.toString());
      this.cookieservice.set('role', "user");
      this.auth.login(user);
      this.router.navigate(['/home']);
    }
  }
}
