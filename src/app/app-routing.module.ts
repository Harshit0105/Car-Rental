import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarsComponent } from './cars/cars.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { AddCarComponent } from './add-car/add-car.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminComponent } from './admin/admin.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { AdminCarsComponent } from './admin-cars/admin-cars.component';
import { AdminCarEditComponent } from './admin-car-edit/admin-car-edit.component';
import { AdminTripComponent } from './admin-trip/admin-trip.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';

const routes: Routes = [
  { path: 'cars/:cate', component: CarsComponent },
  { path: 'carDetails', component: CarsComponent },
  { path: 'navigation', component: NavigationComponent },
  { path: 'carDetails/:id', component: CarDetailComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'adminCars', component: AdminCarsComponent },
  { path: 'adminTrips', component: AdminTripComponent },
  { path: 'adminUsers', component: AdminUsersComponent },
  { path: 'carEdit/:id', component: AdminCarEditComponent },
  { path: 'addCar', component: AddCarComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
export const routingComponents = [
  NavigationComponent,
  HomeComponent,
  FooterComponent,
  LoginComponent,
  SignupComponent,
  CarsComponent,
  ProfileComponent,
  AdminUsersComponent,
  AdminCarsComponent,
  AddCarComponent,
  PageNotFoundComponent,
  AdminComponent,
  CarDetailComponent,
  AdminCarEditComponent,
  AdminTripComponent,
]
