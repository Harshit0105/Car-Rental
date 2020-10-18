import { Component, OnInit } from '@angular/core';
import { ICar } from '../ICar';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CarserviceService } from '../carservice.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { combineAll } from 'rxjs/operators';


@Component({
  selector: 'app-admin-car-edit',
  templateUrl: './admin-car-edit.component.html',
  styleUrls: ['./admin-car-edit.component.css']
})
export class AdminCarEditComponent implements OnInit {
  car: ICar;
  carname: String;
  category: String;
  transmission: String;
  price: Number;
  myForm: FormGroup;
  submitted: Boolean;
  constructor(
    private fb: FormBuilder,
    private carservice: CarserviceService,
    private Aroute: ActivatedRoute,
    private router: Router,
    private cookiservice: CookieService,
  ) { }

  ngOnInit(): void {
    if (!this.cookiservice.check('email_id') || this.cookiservice.get('role') != "admin") {
      this.router.navigate(['']);
    }
    else {
      this.Aroute.params.subscribe((param) => this.getData(param.id));
    }
    this.submitted = false;
    this.myForm = this.fb.group({
      carname: ['', Validators.required],
      category: ['', Validators.required],
      transmission: ['', Validators.required],
      price: ['', Validators.required],
    });
  }
  getData(id: String) {
    this.carservice.getCarDetail(id).subscribe((res) => {
      this.car = res[0];
    });
  }
  get myFormControl() {
    return this.myForm.controls;
  }
  save() {
    this.submitted = true;
    this.carservice.updateCar(this.car).subscribe((res) => location.reload());
  }
}
