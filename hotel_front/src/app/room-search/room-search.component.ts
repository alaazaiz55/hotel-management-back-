import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdminService } from '../services/room.service';

@Component({
  selector: 'app-room-search',
  templateUrl: './room-search.component.html',
  styleUrls: ['./room-search.component.scss']
})
export class RoomSearchComponent implements OnInit {
  startDate: string= '' ;
  endDate: string= '' ;
  roomType: string = '';
  roomTypes: string[] = [];
  error: string = '';

  
  
    rooms: any[] = [];
    filteredRooms: any[] = [];
    
    selectedRoomType: string = '';
    currentPage: number = 1;
    roomsPerPage: number = 5;

  @Output() searchResult = new EventEmitter<any[]>(); // Émetteur d'événements

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchRoomTypes();
  }

  async fetchRoomTypes() {
    try {
      this.adminService.getRoomTypes().subscribe(res => {
        console.log(res)
         this.roomTypes = res;
      });
    } catch (error) {
      console.error('Error fetching room types:', error);
    }
  }

  showError(message: string, timeout = 5000) {
    this.error = message;
    setTimeout(() => (this.error = ''), timeout);
  }

  /*async handleInternalSearch() {
    if (!this.startDate || !this.endDate || !this.roomType) {
      this.showError('Please select all fields');
      return;
    }

    try {
      const response = await this.adminService.getAvailableRoomsByDateAndType(
        this.startDate,
        this.endDate,
        this.roomType
      );

      if (response.statusCode === 200) {
        if (response.roomList.length === 0) {
          this.showError('Room not currently available for this date range on the selected room type.');
          return;
        }
        this.searchResult.emit(response.roomList);
        this.error = '';
      }
    } catch (error) {
      this.showError('Unknown error occurred: ' + error.message);
    }
  }*/



    handleInternalSearch() {
      try {

       
        
        this.adminService.getAvailableRoomsByDateAndType(this.startDate, this.endDate , this.roomType).subscribe(res => {
          console.log(res)
          this.rooms = res.roomList;
        this.filteredRooms = res;
        console.log( this.filteredRooms)
        });
      
      } catch (error) {
        console.error('Error fetching room types:', error);
      }
    }


    filterRooms(): void {
      if (this.selectedRoomType === '') {
        this.filteredRooms = this.rooms;
      } else {
        this.filteredRooms = this.rooms.filter(room => room.roomType === this.selectedRoomType);
      }
      this.currentPage = 1;
    }

    get currentRooms(): any[] {
      const indexOfLastRoom = this.currentPage * this.roomsPerPage;
      const indexOfFirstRoom = indexOfLastRoom - this.roomsPerPage;
      return this.filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);
    }
  
}

