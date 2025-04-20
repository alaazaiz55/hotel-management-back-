import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/room.service';

@Component({
  selector: 'app-room-result',
  templateUrl: './room-result.component.html',
  styleUrls: ['./room-result.component.scss']
})
export class RoomResultComponent {

  @Input() roomSearchResults: any[] = [];
  isAdmin!: boolean;

  constructor(private router: Router, private adminService: AdminService) {
    this.isAdmin = this.adminService.isAdmin();
  }

  navigateToRoom(roomId: number) {
    const route = this.isAdmin ? `/admin/edit-room/${roomId}` : `/roomDetails/${roomId}`;
    this.router.navigate([route]);
  }

}
