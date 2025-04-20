import { Component } from '@angular/core';
import { AdminService } from '../services/room.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent {

  confirmationCode: string = '';
  bookingDetails: any = null;
  error: string | null = null;

  constructor(private adminService: AdminService) {}

  handleSearch() {
    if (!this.confirmationCode.trim()) {
      this.error = "Please Enter a booking confirmation code";
      setTimeout(() => (this.error = null), 5000);
      return;
    }

    this.adminService.getBookingByConfirmationCode(this.confirmationCode)
      .subscribe(
        (response: any) => {
          this.bookingDetails = response.booking;
          this.error = null;
        },
        (error) => {
          this.error = error.error?.message || error.message;
          setTimeout(() => (this.error = null), 5000);
        }
      );
  }

}
