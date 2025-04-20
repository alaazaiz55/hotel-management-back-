import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AdminService } from '../services/room.service';


//import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent {

  startDate: string= '' ;
  endDate: string= '' ;
  roomType: string = '';
  roomForm!: FormGroup;


  rooms: any[] = [];
  filteredRooms: any[] = [];
  roomTypes: string[] = [];
  selectedRoomType: string = '';
  currentPage: number = 1;
  roomsPerPage: number = 5;

  constructor(/*private apiService: ApiService*/private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchRooms();
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
 

  fetchRooms(): void {
    this.adminService.getAllRooms().subscribe(
      response => {
        this.rooms = response.roomList;
        this.filteredRooms = response;
        console.log( this.filteredRooms)
      },
      error => console.error('Error fetching rooms:', error)
    );
  }



  handleSearchResult(results: any[]): void {
    this.rooms = results;
    this.filteredRooms = results;
  }

 /* handleInternalSearch() {
    try {

     
      
      this.adminService.getAvailableRoomsByDateAndType(this.startDate, this.endDate , this.roomType).subscribe(res => {
        console.log(res)
         this.roomTypes = res;
      });
    
    } catch (error) {
      console.error('Error fetching room types:', error);
    }
  }*/

  handleRoomTypeChange(event: any): void {
    this.selectedRoomType = event.target.value;
   // this.filterRooms();
   this.handleInternalSearch(this.selectedRoomType)
   
  }

  handleInternalSearch(selectedRoomType: any) {
    try {
      
       this.adminService.getAvailableType(this.selectedRoomType).subscribe(res => {
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

  paginate(pageNumber: number): void {
    this.currentPage = pageNumber;
  }
}



