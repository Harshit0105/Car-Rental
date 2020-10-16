import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../IUser';
import { UserService } from '../user.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';

const UploadURL = 'http://localhost:8000/api/upload';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  isUpdate: Boolean;
  myForm: FormGroup;
  submitted: Boolean;
  profilePath: string;
  uploadedImage: File;
  error: Boolean;

  constructor(
    private fb: FormBuilder,
    private userservice: UserService,
    private router: Router,
    private cookiservice: CookieService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.error = false;
    this.isUpdate = false;
    this.submitted = false;
    if (!this.cookiservice.check('email_id')) {
      this.router.navigate(['/login']);
    }
    this.userservice.getUser(this.cookiservice.get('email_id')).subscribe((res) => {
      if (res == null || res.status == 400) {
        this.router.navigate(['/login']);
      }
      else {
        this.user = res;
      }
    });
    this.myForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      email_id: ['', [Validators.required, Validators.email]],
      phoneno: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      gender: ['', Validators.required],
      profilePath: [''],
      uploadedImage: [''],
    });
  }

  updateClick() {
    this.isUpdate = true;
  }
  onFileChange(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.profilePath = file.name;
    this.myForm.get('uploadedImage').setValue(file);
  }
  updateSave() {
    this.submitted = true;
    if (!this.myForm.get('uploadedImage').value) {
      console.log("No pic");
      this.userservice.updateProfile(this.user).subscribe((res) => {
        if (res['message'] == "Update success") {
          this.isUpdate = false;
        }
        else {
          this.error = true;
        }
      });
    }
    else {
      var pic = this.myForm.get('uploadedImage').value as File
      const formData = new FormData();
      formData.append('uploadedImage', pic, this.user._id.toString() + ".jpg");
      this.user.profilePath = this.user._id.toString() + ".jpg";
      this.userservice.uploadProfilePic(formData).subscribe((res) => {
        console.log(res['success']);
        this.userservice.updateProfile(this.user).subscribe((res) => {
          if (res['message'] == "Update success") {
            this.isUpdate = false;
          }
          else {
            this.error = true;
          }
        });
      });
    }
  }

  get myFormControl() {
    return this.myForm.controls;
  }
}


