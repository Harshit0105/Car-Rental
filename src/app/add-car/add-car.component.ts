import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { CarserviceService } from '../carservice.service';
import { HttpResponse } from '@angular/common/http';
import { ICar } from '../ICar';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {
  myForm: FormGroup;
  carname: String;
  price: Number;
  transmission: String;
  category: String;
  bodyPic: File;
  interiorPic: File;
  bodyPath: String;
  intPath: String;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cookieservice: CookieService,
    private carservice: CarserviceService,
  ) { }

  ngOnInit(): void {
    this.category = "ec";
    this.transmission = "Manual"
    if (!this.cookieservice.check('email_id') || this.cookieservice.get('role') != "admin") {
      this.router.navigate(['/home']);
    }
    this.myForm = this.fb.group({
      carname: ['', Validators.required],
      price: ['', Validators.required],
      transmission: ['', Validators.required],
      category: ['', Validators.required],
      bodyPic: ['', Validators.required],
      interiorPic: ['', Validators.required],
    });
  }
  onBodyFileChange(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.bodyPath = file.name;
    console.log(this.bodyPath);
    this.myForm.get('bodyPic').setValue(file);
  }
  onIntFileChange(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.intPath = file.name;
    console.log(this.intPath);
    this.myForm.get('interiorPic').setValue(file);
  }
  addCar(car: ICar) {
    if (this.myForm.valid) {
      var formData1 = new FormData();
      var formData2 = new FormData();
      this.carservice.addNewCar(car).subscribe((res) => {
        var id = res as String;
        console.log(id);
        var body = id['id'] + "_body.jpg";
        var interior = id['id'] + "_int.jpg";
        formData1.append('uploadedImage', this.myForm.get('bodyPic').value, body);
        formData2.append('uploadedImage', this.myForm.get('interiorPic').value, interior);
        car.bodyPic = body;
        car.interiorPic = interior;
        car._id = id['id'];
        this.carservice.addCarPic(formData1).subscribe((res) => {
          if (res['success']) {
            this.carservice.addCarPic(formData2).subscribe((res) => {
              if (res['success']) {
                this.carservice.updateCar(car).subscribe((res) => {
                  if (res['message'] = "No car found") {
                    console.log("No car updated");
                  }
                  else if (res['message'] = "Update success") {
                    this.router.navigate(['/addCar'])
                  }
                  else {
                    console.log("Erro");
                  }
                })
              }
            })
          }
        });
      });
    }
  }
}
