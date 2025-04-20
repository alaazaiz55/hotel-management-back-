import { Component, Input } from '@angular/core';
import { AdminService } from '../services/room.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-result-s',
  templateUrl: './room-result-s.component.html',
  styleUrls: ['./room-result-s.component.scss']
})
export class RoomResultSComponent {

   @Input() roomSearchResults: any[] = []; 
    isAdmin!: boolean;
  
    constructor(private router: Router, private adminService: AdminService) {
     /* this.isAdmin = this.adminService.isAdmin();*/
    }
  
    navigateToRoom(roomId: number) {
     /* const route = this.isAdmin ? `/admin/edit-room/${roomId}` : `/room-details-book/${roomId}`;
      this.router.navigate([route]);*/
    }

}
