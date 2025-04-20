import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../services/room.service';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss']
})
export class RoomDetailsComponent implements OnInit {
  roomId: string | null = null;
  roomDetails: any = null;
  isLoading = true;
  error: string | null = null;
  bookingForm: FormGroup;
  totalPrice = 0;
  totalGuests = 1;
  showMessage = false;
  confirmationCode = '';
  errorMessage = '';
  userId: string = '';
  showBookingForm = false;
  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private fb: FormBuilder,
    private router: Router,
    private bookingService: BookingService
  ) {
    this.bookingForm = this.fb.group({
      checkInDate: [null],
      checkOutDate: [null],
      numAdults: [1],
      numChildren: [0]
    });
  }

  ngOnInit(): void {
   this.roomId = this.route.snapshot.paramMap.get('id');
  //  if (this.roomId) {
      this.fetchRoomDetails();
   // }
  }

  

  fetchRoomDetails() {
    this.isLoading = true;
    console.log(this.roomId)
   // this.roomId = '2';
    this.adminService.getRoomById(this.roomId!).subscribe({
      next: (res) => {
        
        this.roomDetails = res;
        console.log(this.roomDetails)
  
        // Appel de getUserProfile après avoir récupéré les détails de la salle
      /*  this.adminService.getUserProfile().subscribe({
          next: (userProfile) => {
            this.userId = userProfile.user.id;
          },
          error: (error) => {
            this.error = error?.error?.message || error?.message || 'Une erreur est survenue';
          }
        });*/
      },
      error: (error) => {
        this.error = error?.error?.message || error?.message || 'Une erreur est survenue';
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  handleConfirmBooking() {
    this.showBookingForm = true;
    const { checkInDate, checkOutDate, numAdults, numChildren } = this.bookingForm.value;
    if (!checkInDate || !checkOutDate) {
      this.errorMessage = 'Please select check-in and check-out dates.';
      setTimeout(() => (this.errorMessage = ''), 5000);
      return;
    }

    if (numAdults < 1 || numChildren < 0) {
      this.errorMessage = 'Please enter valid numbers for adults and children.';
      setTimeout(() => (this.errorMessage = ''), 5000);
      return;
    }

    const totalDays = (new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 3600 * 24) + 1;
    this.totalGuests = numAdults + numChildren;
    this.totalPrice = this.roomDetails.roomPrice * totalDays;
  }

  acceptBooking() {

    console.log("ffff")

    try {
      const { checkInDate, checkOutDate, numAdults, numChildren } = this.bookingForm.value;
      const booking = {
        checkInDate: new Date(checkInDate).toISOString().split('T')[0],
        checkOutDate: new Date(checkOutDate).toISOString().split('T')[0],
        numOfAdults: numAdults,
        numOfChildren: numChildren
      };

     
      this.roomId ='2';
      this.userId = '1'
  
      this.bookingService.bookRoom(this.roomId!, this.userId, booking).subscribe({
        next: (response) => {
          this.confirmationCode = response.bookingConfirmationCode;
          this.showMessage = true;
          
          setTimeout(() => {
            this.showMessage = false;
            this.router.navigate(['/rooms']);
          }, 10000);
        },
        error: (error) => {
          this.errorMessage = error.error?.message || error.message;
          setTimeout(() => (this.errorMessage = ''), 5000);
        }
      });
  
    } catch (error) {
      console.error("Erreur lors de la réservation :", error);
    }
  }
  

}
