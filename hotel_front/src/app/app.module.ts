import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { RoomsComponent } from './rooms/rooms.component';
import { BookingComponent } from './booking/booking.component';
import { MenuComponent } from './menu/menu.component';
import { MainComponent } from './main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoomResultComponent } from './room-result/room-result.component';
import { RoomSearchComponent } from './room-search/room-search.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RoomResultSComponent } from './room-result-s/room-result-s.component';
import { RoomDetailsComponent } from './room-details/room-details.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    RoomsComponent,
    BookingComponent,
    HomeComponent,
    MenuComponent,
    MainComponent,
    RoomResultComponent,
    RoomSearchComponent,
    RoomResultSComponent,
    RoomDetailsComponent,
    ProfilePageComponent,
    AdminPageComponent,
    TestComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule 
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
