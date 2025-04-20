import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { RoomsComponent } from './rooms/rooms.component';
import { BookingComponent } from './booking/booking.component';
import { RoomDetailsComponent } from './room-details/room-details.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  
  
 {
    path: 'home',
    component: HomeComponent
  //  canActivate: [authGuard]
  },
  {
    path: 'rooms',
    component: RoomsComponent
  //  canActivate: [authGuard]
  },
  {
    path: 'mybooking',
    component: BookingComponent
  //  canActivate: [authGuard]
  },

  {
    path: 'roomDetails/:id',
    component: RoomDetailsComponent
  //  canActivate: [authGuard]
  },
  
  {
    path: 'profile/:id',
    component: ProfilePageComponent
  //  canActivate: [authGuard]
  },
  {
    path: 'admin',
    component: AdminPageComponent
  //  canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

  
}
