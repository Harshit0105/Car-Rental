import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarsComponent } from './cars/cars.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CostFinderComponent } from './cost-finder/cost-finder.component';
import { ProfileComponent } from './profile/profile.component';
import { AddCarComponent } from './add-car/add-car.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminComponent } from './admin/admin.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { BookingComponent } from './booking/booking.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'cars/:cate', component: CarsComponent },
  { path: 'carDetails', component: CarsComponent },
  { path: 'navigation', component: NavigationComponent },
  { path: 'carDetails/:id', component: CarDetailComponent },
  { path: 'carBooking/:id', component: BookingComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'addCar', component: AddCarComponent },
  { path: 'approxCost', component: CostFinderComponent },
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
  CostFinderComponent,
  ProfileComponent,
  AddCarComponent,
  SidenavComponent,
  PageNotFoundComponent,
  AdminComponent,
  CarDetailComponent,
  BookingComponent,
]
