import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { CarserviceService } from './carservice.service';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { TripService } from './trip.service';
import { MyCategoryPipe } from './my-category.pipe';






@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    MyCategoryPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [CarserviceService, HttpClient, UserService, AuthService, TripService],
  bootstrap: [AppComponent]
})
export class AppModule { }
