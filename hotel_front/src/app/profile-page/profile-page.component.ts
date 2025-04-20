import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  user: any = null;
  error: string | null = null;
  id: string | null = null;
  constructor(private profileService: ProfileService, private router: Router, private activatedRoute: ActivatedRoute) { 

    this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    
    console.log(this.id)
    this.fetchUserProfile();
  //  this.getUserById();

  }

  getUserById(){
    this.profileService.getUserById(this.id).subscribe(res=>{
      console.log("iiii")
      console.log(res);
      
    })
  }

  fetchUserProfile(): void {
   // const id =1
    this.profileService.getUserProfile(this.id).subscribe({
      next: (response) => {
        this.user = response
        console.log(this.user.name);
        this.profileService.getUserBookings(response.user.id).subscribe({
          next: (userPlusBookings) => {
            this.user = userPlusBookings.user;
          },
          error: (err) => {
            this.error = err.message;
          }
        });
      },
      error: (err) => {
        this.error = err.message;
      }
    });
  }

  handleLogout(): void {
    /*this.profileService.logout();
    this.router.navigate(['/home']);*/
  }

  handleEditProfile(): void {
    this.router.navigate(['/edit-profile']);
  }
}


