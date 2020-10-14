import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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

}
